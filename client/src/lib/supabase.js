import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase credentials not configured. Contact form submissions will not work.\n' +
      'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.\n' +
      'See .env.example for details.'
  )
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')
