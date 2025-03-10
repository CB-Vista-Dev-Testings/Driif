variable "project" {
  description = "Project tag"
  type        = string
}

variable "env" {
  description = "Environment tag"
  type        = string
}

variable "network_id" {
  description = "The ID of the network"
  type        = string
}

variable "firewall_id" {
  description = "The ID of the firewall"
  type        = string
}

# variable "region" {
#   description = "Civo region"
#   type        = string
# }