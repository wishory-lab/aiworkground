import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types
export type Profile = {
  id: string
  clerk_user_id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  user_id: string
  name: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export type AIContent = {
  id: string
  user_id: string
  project_id: string | null
  type: 'marketing' | 'design' | 'code'
  content: any
  created_at: string
}
