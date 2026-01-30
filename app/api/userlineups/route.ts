import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Get all lineups for the current user
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) 
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data, error } = await supabase
    .from('user_lineups')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) 
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ lineups: data || [] });
}

// POST - Create a new lineup
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) 
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json()
  const { title, map, type, side, video_url, difficulty, description } = body;

  // Validation
  if (!title || !map || !type || !side || !video_url || !difficulty) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_lineups')
    .insert({ 
      user_id: user.id, 
      title,
      map,
      type,
      side,
      video_url,
      difficulty,
      description: description || ''
    })
    .select()
    .single();

  if (error) 
    return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ success: true, lineup: data });
}