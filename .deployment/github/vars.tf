variable "GITHUB_TOKEN" {
  type = string
}

variable "GCP_SA_KEY" {
  type = string
}

variable "GCP_SA_KEY_STAG" {
  type = string
}

variable "GCP_PROJECT" {
  type = string
  default = "base-de-datos-dtk2"
}

variable "GCP_PROJECT_STAG" {
  type = string
  default = "base-de-datos-dtk2"
}


variable "SLACK_WEBHOOK" {
  type = string
}

variable "GITHUB_REPOSITORY" {
  type = string
  default = "dtk2-service-node-template"
}

variable "BEARER_TOKEN" {
  type = string
  default = "Bearer d9982530-725d-4944-9601-4840556c99a8"
}

variable "BEARER_TOKEN_API_DTK2" {
  type = string
  default = "l9kyiodmEO7YVX88jw7vQuvSaBbgzD9J"
}

variable "DB_USER" {
  type = string
  default = "pruebas_node"
}

variable "DB_PASSWORD" {
  type = string
  default = "dtk2_2021"
}

variable "DB_SERVER" {
  type = string
  default = "200.111.198.6"
}

variable "DB_DATABASE" {
  type = string
  default = "Destacados"
  
}
