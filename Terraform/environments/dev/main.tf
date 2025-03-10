terraform {
  required_providers {
    civo = {
      source  = "civo/civo"
      version = "~> 1.0.0"
    }
  }
}

provider "civo" {
  token  = var.civo_token
  region = var.region
}

module "network" {
  source = "../../modules/network"

  project = var.project
  env     = var.env
}

module "firewall" {
  source = "../../modules/firewall"

  project    = var.project
  env        = var.env
  network_id = module.network.network_id
}

module "cluster" {
  source = "../../modules/cluster"

  project     = var.project
  env         = var.env
  network_id  = module.network.network_id
  firewall_id = module.firewall.firewall_id
}