resource "github_actions_secret" "CLOUDRUN_SERVICE" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.GITHUB_REPOSITORY
  secret_name     = "CLOUDRUN_SERVICE"
}


resource "github_actions_secret" "GCP_PROJECT" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.GCP_PROJECT
  secret_name     = "GCP_PROJECT"
}

resource "github_actions_secret" "GCP_PROJECT_STAG" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.GCP_PROJECT_STAG
  secret_name     = "GCP_PROJECT_STAG"
}



resource "github_actions_secret" "BEARER_TOKEN" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.BEARER_TOKEN
  secret_name     = "BEARER_TOKEN"
}

resource "github_actions_secret" "BEARER_TOKEN_API_DTK2" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.BEARER_TOKEN_API_DTK2
  secret_name     = "BEARER_TOKEN_API_DTK2"
}

resource "github_actions_secret" "DB_USER" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.DB_USER
  secret_name     = "DB_USER"
}

resource "github_actions_secret" "DB_PASSWORD" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.DB_PASSWORD
  secret_name     = "DB_PASSWORD"
}

resource "github_actions_secret" "DB_SERVER" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.DB_SERVER
  secret_name     = "DB_SERVER"
}

resource "github_actions_secret" "DB_DATABASE" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.DB_DATABASE
  secret_name     = "DB_DATABASE"
}

resource "github_actions_secret" "GCP_SA_KEY" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.GCP_SA_KEY
  secret_name     = "GCP_SA_KEY"
}

resource "github_actions_secret" "GCP_SA_KEY_STAG" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.GCP_SA_KEY_STAG
  secret_name     = "GCP_SA_KEY_STAG"
}

resource "github_actions_secret" "SLACK_WEBHOOK" {
  repository      = var.GITHUB_REPOSITORY
  plaintext_value = var.SLACK_WEBHOOK
  secret_name     = "SLACK_WEBHOOK"
}
