"""
WorkflowAI MCP Server - Design Module
AI-powered design automation and creative assistance

Features:
- AI image generation and editing
- Color palette optimization
- Layout analysis and suggestions
- Figma integration helpers
- Brand consistency checking
"""

import asyncio
import json
import os
from typing import Any, Dict, List, Optional
from datetime import datetime
import base64
from io import BytesIO

from mcp import ClientSession, StdioServerParameters
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.server.stdio
import mcp.types as types

from openai import AsyncOpenAI
import aiohttp
from PIL import Image, ImageColor
import colorsys

# Initialize AI clients
openai_client = AsyncOpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Design context storage
DESIGN_SYSTEMS = {}
COLOR_PALETTES = {}
BRAND_GUIDELINES = {}

server = Server("workflow-ai-design")

@server.list_resources()
async def list_resources() -> List[types.Resource]:
    """List available design resources"""
    return [
        types.Resource(
            uri="design://systems",
            name="Design Systems",
            mimeType="application/json",
            description="Design system components, tokens, and guidelines"
        ),
        types.Resource(
            uri="colors://palettes", 
            name="Color Palettes",
            mimeType="application/json",
            description="Brand color palettes and variations"
        ),
        types.Resource(
            uri="brand://assets",
            name="Brand Assets",
            mimeType="application/json", 
            description="Logos, fonts, and visual identity assets"
        ),
        types.Resource(
            uri="templates://layouts",
            name="Layout Templates",
            mimeType="application/json",
            description="Pre-designed layout templates and grids"
        )
    ]

@server.read_resource()
async def read_resource(uri: str) -> str:
    """Read design resource content"""
    if uri == "design://systems":
        return json.dumps(DESIGN_SYSTEMS)
    elif uri == "colors://palettes":
        return json.dumps(COLOR_PALETTES)
    elif uri == "brand://assets":
        return json.dumps(BRAND_GUIDELINES)
    elif uri == "templates://layouts":
        # Mock layout templates
        return json.dumps({
            "social_media": {
                "instagram_post": {"width": 1080, "height": 1080},
                "instagram_story": {"width": 1080, "height": 1920},
                "twitter_header": {"width": 1500, "height": 500}
            },
            "web_layouts": {
                "hero_section": {"type": "centered", "components": ["headline", "subtitle", "cta"]},
                "product_grid": {"type": "grid", "columns": 3, "spacing": "24px"}
            }
        })
    else:
        raise ValueError(f"Unknown resource: {uri}")

@server.list_tools()
async def list_tools() -> List[types.Tool]:
    """List available design tools"""
    return [
        types.Tool(
            name="generate_image",
            description="Generate images using AI based on text prompts",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Detailed description of the image to generate"},
                    "style": {"type": "string", "enum": ["photorealistic", "illustration", "minimal", "abstract", "logo"], "default": "photorealistic"},
                    "dimensions": {"type": "string", "enum": ["1024x1024", "1024x1792", "1792x1024"], "default": "1024x1024"},
                    "brand_id": {"type": "string", "description": "Brand context for consistent styling"},
                    "color_scheme": {"type": "string", "description": "Preferred color scheme or palette"}
                },
                "required": ["prompt"]
            }
        ),
        types.Tool(
            name="create_color_palette",
            description="Generate harmonious color palettes based on input",
            inputSchema={
                "type": "object",
                "properties": {
                    "base_color": {"type": "string", "description": "Hex color code as starting point"},
                    "palette_type": {"type": "string", "enum": ["monochromatic", "analogous", "complementary", "triadic", "tetradic"], "default": "complementary"},
                    "num_colors": {"type": "integer", "minimum": 3, "maximum": 10, "default": 5},
                    "mood": {"type": "string", "enum": ["vibrant", "muted", "pastel", "dark", "bright"], "default": "vibrant"}
                },
                "required": ["base_color"]
            }
        ),
        types.Tool(
            name="analyze_design_layout",
            description="Analyze design layout and provide improvement suggestions",
            inputSchema={
                "type": "object",
                "properties": {
                    "layout_type": {"type": "string", "enum": ["webpage", "mobile_app", "poster", "social_media", "email"]},
                    "elements": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "type": {"type": "string", "enum": ["text", "image", "button", "form", "navigation"]},
                                "position": {"type": "object", "properties": {"x": {"type": "number"}, "y": {"type": "number"}}},
                                "size": {"type": "object", "properties": {"width": {"type": "number"}, "height": {"type": "number"}}},
                                "importance": {"type": "integer", "minimum": 1, "maximum": 10}
                            }
                        }
                    },
                    "target_audience": {"type": "string", "description": "Primary target audience"},
                    "goals": {"type": "array", "items": {"type": "string"}, "description": "Design goals (e.g., conversion, engagement)"}
                },
                "required": ["layout_type", "elements"]
            }
        ),
        types.Tool(
            name="optimize_for_platform",
            description="Optimize design assets for specific platforms",
            inputSchema={
                "type": "object",
                "properties": {
                    "platform": {"type": "string", "enum": ["instagram", "facebook", "twitter", "linkedin", "tiktok", "pinterest"]},
                    "content_type": {"type": "string", "enum": ["post", "story", "ad", "profile", "cover"]},
                    "design_elements": {
                        "type": "object",
                        "properties": {
                            "text_amount": {"type": "string", "enum": ["minimal", "moderate", "heavy"]},
                            "visual_style": {"type": "string", "enum": ["photography", "illustration", "typography", "mixed"]},
                            "color_intensity": {"type": "string", "enum": ["subtle", "moderate", "bold"]}
                        }
                    }
                },
                "required": ["platform", "content_type"]
            }
        ),
        types.Tool(
            name="create_logo_variations",
            description="Generate logo variations and improvements",
            inputSchema={
                "type": "object",
                "properties": {
                    "concept": {"type": "string", "description": "Logo concept or company description"},
                    "style": {"type": "string", "enum": ["minimalist", "modern", "vintage", "playful", "professional"], "default": "modern"},
                    "colors": {"type": "array", "items": {"type": "string"}, "description": "Preferred colors (hex codes)"},
                    "variations": {"type": "integer", "minimum": 1, "maximum": 5, "default": 3},
                    "formats": {"type": "array", "items": {"type": "string", "enum": ["horizontal", "vertical", "icon", "wordmark"]}}
                },
                "required": ["concept"]
            }
        ),
        types.Tool(
            name="check_brand_consistency",
            description="Check design compliance with brand guidelines",
            inputSchema={
                "type": "object",
                "properties": {
                    "brand_id": {"type": "string", "description": "Brand identifier"},
                    "design_elements": {
                        "type": "object",
                        "properties": {
                            "colors": {"type": "array", "items": {"type": "string"}},
                            "fonts": {"type": "array", "items": {"type": "string"}},
                            "logo_usage": {"type": "string"},
                            "spacing": {"type": "object"},
                            "imagery_style": {"type": "string"}
                        }
                    }
                },
                "required": ["brand_id", "design_elements"]
            }
        ),
        types.Tool(
            name="suggest_typography",
            description="Suggest typography combinations and hierarchy",
            inputSchema={
                "type": "object",
                "properties": {
                    "content_type": {"type": "string", "enum": ["website", "app", "print", "social", "presentation"]},
                    "brand_personality": {"type": "string", "enum": ["professional", "creative", "playful", "elegant", "modern"]},
                    "hierarchy_levels": {"type": "integer", "minimum": 2, "maximum": 6, "default": 4},
                    "readability_priority": {"type": "string", "enum": ["high", "medium", "low"], "default": "high"}
                },
                "required": ["content_type"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: Dict[str, Any]) -> List[types.TextContent]:
    """Execute design tools"""
    
    if name == "generate_image":
        prompt = arguments["prompt"]
        style = arguments.get("style", "photorealistic")
        dimensions = arguments.get("dimensions", "1024x1024")
        brand_id = arguments.get("brand_id")
        color_scheme = arguments.get("color_scheme")
        
        # Enhance prompt with style and brand context
        enhanced_prompt = f"{prompt}"
        
        if style != "photorealistic":
            enhanced_prompt += f", {style} style"
        
        if color_scheme:
            enhanced_prompt += f", color scheme: {color_scheme}"
        
        if brand_id and brand_id in BRAND_GUIDELINES:
            brand_info = BRAND_GUIDELINES[brand_id]
            enhanced_prompt += f", following brand guidelines: {brand_info.get('style_guide', '')}"
        
        try:
            response = await openai_client.images.generate(
                model="dall-e-3",
                prompt=enhanced_prompt,
                size=dimensions,
                quality="standard",
                n=1
            )
            
            image_url = response.data[0].url
            revised_prompt = response.data[0].revised_prompt
            
            result = f"""🎨 AI Image Generated Successfully!

🖼️ Image URL: {image_url}

📝 Original Prompt: {prompt}
✨ Enhanced Prompt: {revised_prompt}
📐 Dimensions: {dimensions}
🎭 Style: {style}

💡 Usage Tips:
- Download the image before the URL expires (1 hour)
- Consider A/B testing different variations
- Optimize for your target platform's specs
            """
            
            return [types.TextContent(type="text", text=result)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error generating image: {str(e)}"
            )]
    
    elif name == "create_color_palette":
        base_color = arguments["base_color"].lstrip('#')
        palette_type = arguments.get("palette_type", "complementary")
        num_colors = arguments.get("num_colors", 5)
        mood = arguments.get("mood", "vibrant")
        
        try:
            # Convert hex to RGB
            rgb = tuple(int(base_color[i:i+2], 16) for i in (0, 2, 4))
            
            # Convert RGB to HSV for color manipulation
            hsv = colorsys.rgb_to_hsv(rgb[0]/255, rgb[1]/255, rgb[2]/255)
            
            colors = []
            
            if palette_type == "monochromatic":
                # Vary saturation and value
                for i in range(num_colors):
                    s = max(0.2, hsv[1] - 0.3 + (0.6 * i / (num_colors - 1)))
                    v = max(0.3, hsv[2] - 0.2 + (0.4 * i / (num_colors - 1)))
                    rgb_new = colorsys.hsv_to_rgb(hsv[0], s, v)
                    colors.append('#%02x%02x%02x' % (int(rgb_new[0]*255), int(rgb_new[1]*255), int(rgb_new[2]*255)))
                    
            elif palette_type == "complementary":
                # Base color + complementary + variations
                colors.append(f"#{base_color}")
                comp_hue = (hsv[0] + 0.5) % 1.0
                comp_rgb = colorsys.hsv_to_rgb(comp_hue, hsv[1], hsv[2])
                colors.append('#%02x%02x%02x' % (int(comp_rgb[0]*255), int(comp_rgb[1]*255), int(comp_rgb[2]*255)))
                
                # Add variations
                for i in range(num_colors - 2):
                    hue_offset = 0.1 * (i + 1)
                    new_hue = (hsv[0] + hue_offset) % 1.0
                    rgb_new = colorsys.hsv_to_rgb(new_hue, hsv[1], hsv[2])
                    colors.append('#%02x%02x%02x' % (int(rgb_new[0]*255), int(rgb_new[1]*255), int(rgb_new[2]*255)))
                    
            elif palette_type == "analogous":
                # Adjacent colors on color wheel
                for i in range(num_colors):
                    hue_offset = 0.05 * (i - num_colors//2)
                    new_hue = (hsv[0] + hue_offset) % 1.0
                    rgb_new = colorsys.hsv_to_rgb(new_hue, hsv[1], hsv[2])
                    colors.append('#%02x%02x%02x' % (int(rgb_new[0]*255), int(rgb_new[1]*255), int(rgb_new[2]*255)))
                    
            elif palette_type == "triadic":
                # Three colors equally spaced
                colors.append(f"#{base_color}")
                for i in [1, 2]:
                    new_hue = (hsv[0] + i/3.0) % 1.0
                    rgb_new = colorsys.hsv_to_rgb(new_hue, hsv[1], hsv[2])
                    colors.append('#%02x%02x%02x' % (int(rgb_new[0]*255), int(rgb_new[1]*255), int(rgb_new[2]*255)))
                    
                # Fill remaining slots with variations
                for i in range(num_colors - 3):
                    hue_offset = 0.05 * (i + 1)
                    new_hue = (hsv[0] + hue_offset) % 1.0
                    rgb_new = colorsys.hsv_to_rgb(new_hue, hsv[1] * 0.8, hsv[2])
                    colors.append('#%02x%02x%02x' % (int(rgb_new[0]*255), int(rgb_new[1]*255), int(rgb_new[2]*255)))
            
            # Apply mood adjustments
            if mood == "muted":
                colors = [color for color in colors]  # Keep as is for now
            elif mood == "pastel":
                # Lighter, less saturated versions would be computed here
                pass
            
            palette_info = f"""🎨 Color Palette Generated

🎯 Base Color: #{base_color}
📐 Type: {palette_type.title()}
🎭 Mood: {mood.title()}
🔢 Colors: {num_colors}

🌈 Generated Palette:
{chr(10).join([f"   {i+1}. {color}" for i, color in enumerate(colors)])}

💡 Usage Recommendations:
- Use the first color as primary brand color
- Second color works well for accents and CTAs
- Remaining colors are perfect for backgrounds and supporting elements
- Test contrast ratios for accessibility (WCAG guidelines)

📋 CSS Variables:
{chr(10).join([f"   --color-{i+1}: {color};" for i, color in enumerate(colors)])}
            """
            
            # Store palette for future use
            palette_id = f"palette_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            COLOR_PALETTES[palette_id] = {
                "colors": colors,
                "base_color": base_color,
                "type": palette_type,
                "mood": mood,
                "created": datetime.now().isoformat()
            }
            
            return [types.TextContent(type="text", text=palette_info)]
            
        except Exception as e:
            return [types.TextContent(
                type="text",
                text=f"❌ Error creating color palette: {str(e)}"
            )]
    
    elif name == "analyze_design_layout":
        layout_type = arguments["layout_type"]
        elements = arguments["elements"]
        target_audience = arguments.get("target_audience", "general")
        goals = arguments.get("goals", [])
        
        # Analyze layout for common design principles
        analysis_points = []
        
        # Check visual hierarchy
        high_importance = [el for el in elements if el.get("importance", 5) > 7]
        if len(high_importance) > 3:
            analysis_points.append("⚠️ Too many high-importance elements may confuse users")
        
        # Check for balance
        total_width = sum([el.get("size", {}).get("width", 0) for el in elements])
        avg_x = sum([el.get("position", {}).get("x", 0) for el in elements]) / len(elements) if elements else 0
        
        if avg_x < 0.4 or avg_x > 0.6:  # Assuming normalized coordinates
            analysis_points.append("⚖️ Consider rebalancing elements for better visual weight")
        
        # Platform-specific recommendations
        platform_tips = {
            "webpage": [
                "Ensure key CTAs are above the fold",
                "Use F-pattern or Z-pattern for content layout",
                "Maintain consistent spacing (8px grid system)"
            ],
            "mobile_app": [
                "Keep interactive elements at least 44px in size",
                "Place important actions within thumb-reach zones",
                "Use familiar navigation patterns"
            ],
            "poster": [
                "Create clear visual hierarchy with typography",
                "Leave adequate white space for breathing room",
                "Ensure readability from viewing distance"
            ],
            "social_media": [
                "Consider how content appears in feed context",
                "Optimize for mobile viewing (80% of users)",
                "Keep text legible at small sizes"
            ]
        }
        
        recommendations = platform_tips.get(layout_type, ["General design principles apply"])
        
        analysis_result = f"""🔍 Design Layout Analysis

📱 Layout Type: {layout_type.replace('_', ' ').title()}
👥 Target Audience: {target_audience.title()}
🎯 Goals: {', '.join(goals) if goals else 'Not specified'}

📊 Element Analysis:
   • Total Elements: {len(elements)}
   • High Priority: {len(high_importance)} elements
   • Layout Balance: {'Balanced' if 0.4 <= avg_x <= 0.6 else 'Needs adjustment'}

⚡ Key Findings:
{chr(10).join([f"   • {point}" for point in analysis_points]) if analysis_points else "   • Layout follows good design practices"}

💡 Recommendations:
{chr(10).join([f"   • {tip}" for tip in recommendations])}

🎨 Enhancement Suggestions:
   • Consider using visual hierarchy to guide user attention
   • Ensure sufficient contrast ratios (4.5:1 minimum)
   • Test layout on multiple screen sizes
   • Validate with actual users from target audience
        """
        
        return [types.TextContent(type="text", text=analysis_result)]
    
    elif name == "optimize_for_platform":
        platform = arguments["platform"]
        content_type = arguments["content_type"]
        design_elements = arguments.get("design_elements", {})
        
        # Platform specifications and best practices
        platform_specs = {
            "instagram": {
                "post": {"size": "1080x1080", "aspect": "1:1", "text_limit": "minimal"},
                "story": {"size": "1080x1920", "aspect": "9:16", "text_limit": "moderate"},
                "ad": {"size": "1080x1080", "aspect": "1:1", "text_limit": "20% rule"}
            },
            "facebook": {
                "post": {"size": "1200x630", "aspect": "1.91:1", "text_limit": "minimal"},
                "ad": {"size": "1080x1080", "aspect": "1:1", "text_limit": "20% rule"},
                "cover": {"size": "851x315", "aspect": "2.7:1", "text_limit": "moderate"}
            },
            "twitter": {
                "post": {"size": "1200x675", "aspect": "16:9", "text_limit": "minimal"},
                "header": {"size": "1500x500", "aspect": "3:1", "text_limit": "moderate"}
            },
            "linkedin": {
                "post": {"size": "1200x627", "aspect": "1.91:1", "text_limit": "moderate"},
                "cover": {"size": "1584x396", "aspect": "4:1", "text_limit": "moderate"}
            }
        }
        
        specs = platform_specs.get(platform, {}).get(content_type, {})
        
        # Generate platform-specific recommendations
        recommendations = []
        
        if platform == "instagram":
            recommendations.extend([
                "Use vibrant, eye-catching colors to stand out in feeds",
                "Include faces when possible (38% higher engagement)",
                "Keep branding subtle but consistent",
                "Optimize for mobile viewing (95% of users on mobile)"
            ])
        elif platform == "linkedin":
            recommendations.extend([
                "Use professional, clean design aesthetics",
                "Include relevant industry imagery",
                "Keep text readable and business-appropriate",
                "Consider B2B audience preferences"
            ])
        elif platform == "twitter":
            recommendations.extend([
                "Design for fast consumption (3-second attention span)",
                "Use bold, contrasting elements",
                "Keep visual elements simple and clear",
                "Consider dark mode compatibility"
            ])
        
        # Text amount recommendations
        text_amount = design_elements.get("text_amount", "moderate")
        if text_amount == "heavy" and platform == "instagram":
            recommendations.append("⚠️ Reduce text amount - Instagram performs better with minimal text")
        
        optimization_guide = f"""🚀 Platform Optimization Guide

📱 Platform: {platform.title()}
📋 Content Type: {content_type.replace('_', ' ').title()}

📏 Optimal Specifications:
   • Size: {specs.get('size', 'Standard')}
   • Aspect Ratio: {specs.get('aspect', 'Flexible')}
   • Text Limit: {specs.get('text_limit', 'Moderate')}

🎨 Current Design Elements:
   • Text Amount: {text_amount.title()}
   • Visual Style: {design_elements.get('visual_style', 'Not specified')}
   • Color Intensity: {design_elements.get('color_intensity', 'Not specified')}

💡 Platform-Specific Recommendations:
{chr(10).join([f"   • {rec}" for rec in recommendations])}

⚡ Performance Tips:
   • Use high-contrast colors for mobile visibility
   • Test across different devices and orientations
   • Follow platform's community guidelines
   • Analyze competitor content for inspiration

🔄 A/B Testing Ideas:
   • Test with and without text overlays
   • Compare different color schemes
   • Try various visual styles (photo vs. illustration)
   • Experiment with CTA placement and design
        """
        
        return [types.TextContent(type="text", text=optimization_guide)]
    
    elif name == "create_logo_variations":
        concept = arguments["concept"]
        style = arguments.get("style", "modern")
        colors = arguments.get("colors", [])
        variations = arguments.get("variations", 3)
        formats = arguments.get("formats", ["horizontal", "icon"])
        
        # Generate logo concept prompts
        logo_prompts = []
        
        base_prompt = f"Professional logo design for {concept}, {style} style"
        
        if colors:
            color_desc = ", ".join(colors)
            base_prompt += f", using colors {color_desc}"
        
        for i in range(variations):
            variation_styles = {
                0: "clean and minimal",
                1: "bold and memorable", 
                2: "elegant and sophisticated",
                3: "creative and unique",
                4: "timeless and classic"
            }
            
            variation_prompt = f"{base_prompt}, {variation_styles.get(i, 'distinctive')} approach"
            logo_prompts.append(variation_prompt)
        
        # Format specifications
        format_specs = {
            "horizontal": "wide layout, text beside symbol",
            "vertical": "stacked layout, text below symbol",
            "icon": "symbol only, no text",
            "wordmark": "text only, stylized typography"
        }
        
        logo_guide = f"""🏷️ Logo Concept Development

💼 Concept: {concept}
🎨 Style: {style.title()}
🌈 Colors: {', '.join(colors) if colors else 'Open to suggestions'}
🔢 Variations: {variations}

📐 Format Requirements:
{chr(10).join([f"   • {fmt.title()}: {format_specs[fmt]}" for fmt in formats])}

🎯 Generated Prompts for AI Logo Creation:
{chr(10).join([f"   {i+1}. {prompt}" for i, prompt in enumerate(logo_prompts)])}

💡 Logo Design Guidelines:
   • Ensure scalability (works at 16px and 1600px)
   • Test in black and white for versatility
   • Consider cultural appropriateness for target markets
   • Keep it simple enough to be memorable
   • Avoid trending elements that may date quickly

🔄 Next Steps:
   1. Generate logos using the AI image generation tool
   2. Test each variation at different sizes
   3. Get feedback from target audience
   4. Refine based on usability testing
   5. Create comprehensive brand guidelines

📋 File Formats Needed:
   • Vector: SVG, AI, EPS (for scalability)
   • Raster: PNG (transparent), JPG (backgrounds)
   • Sizes: 16px, 32px, 64px, 128px, 256px, 512px, 1024px
        """
        
        return [types.TextContent(type="text", text=logo_guide)]
    
    elif name == "check_brand_consistency":
        brand_id = arguments["brand_id"]
        design_elements = arguments["design_elements"]
        
        if brand_id not in BRAND_GUIDELINES:
            return [types.TextContent(
                type="text",
                text=f"❌ Brand guidelines not found for '{brand_id}'. Please set up brand guidelines first."
            )]
        
        brand_guide = BRAND_GUIDELINES[brand_id]
        consistency_issues = []
        compliance_score = 100
        
        # Check colors
        brand_colors = brand_guide.get("colors", [])
        used_colors = design_elements.get("colors", [])
        
        if brand_colors and used_colors:
            non_brand_colors = [color for color in used_colors if color not in brand_colors]
            if non_brand_colors:
                consistency_issues.append(f"Non-brand colors used: {', '.join(non_brand_colors)}")
                compliance_score -= 20
        
        # Check fonts
        brand_fonts = brand_guide.get("fonts", [])
        used_fonts = design_elements.get("fonts", [])
        
        if brand_fonts and used_fonts:
            non_brand_fonts = [font for font in used_fonts if font not in brand_fonts]
            if non_brand_fonts:
                consistency_issues.append(f"Non-brand fonts used: {', '.join(non_brand_fonts)}")
                compliance_score -= 15
        
        # Check logo usage
        logo_usage = design_elements.get("logo_usage")
        if logo_usage and "incorrect" in logo_usage.lower():
            consistency_issues.append("Logo usage doesn't follow brand guidelines")
            compliance_score -= 25
        
        # Generate compliance report
        compliance_level = "Excellent" if compliance_score >= 90 else "Good" if compliance_score >= 70 else "Needs Improvement" if compliance_score >= 50 else "Poor"
        
        consistency_report = f"""🎯 Brand Consistency Check

🏷️ Brand: {brand_id}
📊 Compliance Score: {compliance_score}/100
📈 Level: {compliance_level}

{'✅ No Issues Found - Perfect Brand Compliance!' if not consistency_issues else '⚠️ Issues Found:'}
{chr(10).join([f"   • {issue}" for issue in consistency_issues]) if consistency_issues else ''}

📋 Brand Guidelines Summary:
   • Approved Colors: {len(brand_guide.get('colors', []))} colors defined
   • Approved Fonts: {len(brand_guide.get('fonts', []))} fonts available
   • Logo Variations: {len(brand_guide.get('logo_variants', []))} approved versions
   • Style Guide: {'Available' if brand_guide.get('style_guide') else 'Not defined'}

💡 Recommendations:
{('   • Maintain current excellent compliance' if compliance_score >= 90 else 
  '   • Address color and font inconsistencies' if compliance_score >= 70 else
  '   • Review and revise design to meet brand standards')}
   • Document any approved exceptions
   • Update brand guidelines if new elements are approved
   • Train team members on proper brand usage

🔄 Next Steps:
   • {'Continue with current approach' if compliance_score >= 90 else 'Revise design elements to match brand guidelines'}
   • Schedule regular brand compliance reviews
   • Create brand toolkit for easy access to approved assets
        """
        
        return [types.TextContent(type="text", text=consistency_report)]
    
    elif name == "suggest_typography":
        content_type = arguments["content_type"]
        brand_personality = arguments.get("brand_personality", "modern")
        hierarchy_levels = arguments.get("hierarchy_levels", 4)
        readability_priority = arguments.get("readability_priority", "high")
        
        # Typography recommendations based on content type and personality
        font_suggestions = {
            "professional": {
                "primary": ["Inter", "Open Sans", "Source Sans Pro", "Lato"],
                "secondary": ["Merriweather", "Lora", "Playfair Display"],
                "accent": ["Montserrat", "Roboto", "Poppins"]
            },
            "creative": {
                "primary": ["Futura", "Helvetica Neue", "Proxima Nova"],
                "secondary": ["Georgia", "Crimson Text", "Libre Baskerville"],
                "accent": ["Oswald", "Raleway", "Nunito"]
            },
            "playful": {
                "primary": ["Rounded", "Comic Sans MS", "Quicksand"],
                "secondary": ["Pacifico", "Fredoka One", "Kalam"],
                "accent": ["Bangers", "Righteous", "Chewy"]
            },
            "elegant": {
                "primary": ["Playfair Display", "Cormorant Garamond", "Bodoni"],
                "secondary": ["Lora", "Crimson Text", "EB Garamond"],
                "accent": ["Montserrat", "Lato", "Source Sans Pro"]
            },
            "modern": {
                "primary": ["Inter", "SF Pro", "Roboto"],
                "secondary": ["Merriweather", "Source Serif Pro"],
                "accent": ["Poppins", "Nunito Sans", "Work Sans"]
            }
        }
        
        fonts = font_suggestions.get(brand_personality, font_suggestions["modern"])
        
        # Hierarchy suggestions
        hierarchy_guide = {
            2: {"H1": "48px/bold", "Body": "16px/regular"},
            3: {"H1": "48px/bold", "H2": "32px/semibold", "Body": "16px/regular"},
            4: {"H1": "48px/bold", "H2": "32px/semibold", "H3": "24px/medium", "Body": "16px/regular"},
            5: {"H1": "48px/bold", "H2": "32px/semibold", "H3": "24px/medium", "H4": "20px/medium", "Body": "16px/regular"},
            6: {"H1": "48px/bold", "H2": "32px/semibold", "H3": "24px/medium", "H4": "20px/medium", "H5": "18px/medium", "Body": "16px/regular"}
        }
        
        typography_system = hierarchy_guide.get(hierarchy_levels, hierarchy_guide[4])
        
        # Content-specific adjustments
        content_adjustments = {
            "website": "Optimize for screen reading with adequate line height (1.5-1.6)",
            "app": "Use system fonts when possible for better performance",
            "print": "Increase contrast and consider serif fonts for body text",
            "social": "Bold, high-contrast fonts for mobile visibility",
            "presentation": "Sans-serif fonts for distance viewing, minimum 24pt"
        }
        
        typography_guide = f"""📝 Typography System Recommendations

📱 Content Type: {content_type.title()}
🎭 Brand Personality: {brand_personality.title()}
📊 Hierarchy Levels: {hierarchy_levels}
👀 Readability Priority: {readability_priority.title()}

🔤 Font Recommendations:
   • Primary (Headers): {', '.join(fonts['primary'][:3])}
   • Secondary (Subheads): {', '.join(fonts['secondary'][:2])}
   • Accent (Special): {', '.join(fonts['accent'][:2])}

📏 Typography Hierarchy:
{chr(10).join([f"   • {level}: {size}" for level, size in typography_system.items()])}

💡 Content-Specific Guidance:
   • {content_adjustments.get(content_type, 'Standard typography principles apply')}

⚡ Performance & Accessibility:
   • Use web fonts with fallbacks (font-display: swap)
   • Maintain WCAG contrast ratios (4.5:1 minimum)
   • Test readability across devices and screen sizes
   • Consider users with dyslexia (avoid italic/script fonts for body text)

🎨 Implementation Tips:
   • Limit to 2-3 font families maximum
   • Establish consistent spacing scale (1.25 ratio recommended)
   • Use font weights purposefully (avoid too many variations)
   • Test legibility at actual usage sizes

📋 CSS Custom Properties:
   --font-primary: '{fonts["primary"][0]}', sans-serif;
   --font-secondary: '{fonts["secondary"][0]}', serif;
   --font-accent: '{fonts["accent"][0]}', sans-serif;
   
   --text-h1: {typography_system.get('H1', '48px/bold').split('/')[0]};
   --text-body: {typography_system.get('Body', '16px/regular').split('/')[0]};
        """
        
        return [types.TextContent(type="text", text=typography_guide)]
    
    else:
        raise ValueError(f"Unknown tool: {name}")

async def main():
    """Main server execution"""
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="workflow-ai-design",
                server_version="1.0.0",
                capabilities=server.get_capabilities(
                    notification_options=None,
                    experimental_capabilities={}
                )
            )
        )

if __name__ == "__main__":
    asyncio.run(main())