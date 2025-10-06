/*
  # Create tecdital website database schema

  1. New Tables
    - `portfolio_projects`
      - `id` (uuid, primary key)
      - `name` (text) - Project name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Brief description
      - `challenge` (text) - Challenge description
      - `solution` (text) - Solution description
      - `image_url` (text) - Project image URL
      - `project_url` (text) - Live project URL
      - `technologies` (text[]) - Array of technologies used
      - `featured` (boolean) - Whether to show on homepage
      - `display_order` (integer) - Order for display
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text) - Sender name
      - `email` (text) - Sender email
      - `subject` (text) - Message subject
      - `message` (text) - Message content
      - `created_at` (timestamptz)
      - `read` (boolean) - Whether message has been read

  2. Security
    - Enable RLS on both tables
    - Portfolio projects are publicly readable
    - Contact submissions can only be inserted by public users
    - Only authenticated users can read contact submissions
*/

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  challenge text NOT NULL,
  solution text NOT NULL,
  image_url text NOT NULL,
  project_url text,
  technologies text[] NOT NULL DEFAULT '{}',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Portfolio projects policies (public read)
CREATE POLICY "Anyone can view portfolio projects"
  ON portfolio_projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert portfolio projects"
  ON portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update portfolio projects"
  ON portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete portfolio projects"
  ON portfolio_projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_projects(display_order);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_submissions(read) WHERE read = false;