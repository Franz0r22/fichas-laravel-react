variable "PROJECTID" {
  type = string
}

variable "CLOUDRUN_SERVICE" {
  type = string
  default = "dtk2-service-node-template"
}

variable "DB_USER" {
  type = string
}
variable "DB_PASSWORD" {
  type = string
}
variable "DB_SERVER" {
  type = string
}
variable "DB_DATABASE" {
  type = string
}
