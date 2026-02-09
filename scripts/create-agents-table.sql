-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  promote_code VARCHAR(5),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on wallet_address for faster lookups
CREATE UNIQUE INDEX IF NOT EXISTS wallet_address_idx ON agents(wallet_address);

-- Create index on promote_code for uniqueness checks
CREATE UNIQUE INDEX IF NOT EXISTS promote_code_idx ON agents(promote_code) WHERE promote_code IS NOT NULL;
