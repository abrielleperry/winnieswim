-- Create the signups table
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  shopify_customer_id VARCHAR(100) NULL, -- For future Shopify integration
  marketing_consent BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);
CREATE INDEX IF NOT EXISTS idx_signups_shopify_customer_id ON signups(shopify_customer_id);

-- Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from anyone (for the signup form)
CREATE POLICY "Allow public signups" ON signups
  FOR INSERT WITH CHECK (true);

-- Create a policy for reading data (you might want to restrict this)
CREATE POLICY "Allow reading own data" ON signups
  FOR SELECT USING (true);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_signups_updated_at 
  BEFORE UPDATE ON signups 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
