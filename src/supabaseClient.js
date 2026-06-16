import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xoivskauhjutqpfhehqp.supabase.co"
const supabaseKey = "sb_publishable_TTadtabxfU7Zyk5tS1pavw_pjGZcmUe"

export const supabase = createClient(
    supabaseUrl,
    supabaseKey)