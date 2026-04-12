-- Supabase SQL Schema for Will App

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  subscription_status TEXT DEFAULT 'free',
  last_mood TEXT,
  mood_updated_at TIMESTAMP WITH TIME ZONE,
  ai_gender_preference TEXT,
  language TEXT DEFAULT 'English',
  interests TEXT[],
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 2. Messages Table
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  text TEXT NOT NULL,
  sender TEXT NOT NULL, -- 'user' or 'ai'
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own messages."
  ON messages FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own messages."
  ON messages FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- 3. Posts Table (Community)
CREATE TABLE public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  likes INT DEFAULT 0,
  anonymous BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read posts"
  ON posts FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert posts"
  ON posts FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- 4. Experts Table (Marketplace)
CREATE TABLE public.experts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  rating NUMERIC,
  price TEXT,
  imageUrl TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read experts"
  ON experts FOR SELECT
  USING ( true );

-- Initial Seed Data for Experts
INSERT INTO public.experts (name, title, rating, price, imageUrl) VALUES
('Dr. Sarah Smith', 'Clinical Psychologist', 4.9, '$80/session', 'https://via.placeholder.com/100'),
('James Wilson', 'Career Coach', 4.7, '$50/session', 'https://via.placeholder.com/100'),
('Emma Brown', 'Life Counselor', 4.8, '$60/session', 'https://via.placeholder.com/100');
