# variables.tf
variable "civo_token" {
  description = "Civo API token"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Civo region"
  type        = string
  default     = "LON1"
}

variable "project" {
  description = "Project tag"
  type        = string
  default     = "driif"
}

variable "env" {
  description = "Environment tag"
  type        = string
  default     = "dev"
}

