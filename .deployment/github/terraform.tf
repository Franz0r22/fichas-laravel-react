terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "4.13.0"
    }
  }
}

provider "github" {
  token = var.GITHUB_TOKEN
  owner = "dtk2"
}
