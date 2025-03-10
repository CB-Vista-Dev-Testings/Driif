# provider.tf
terraform {
  required_providers {
    civo = {
      source  = "civo/civo"
      version = "1.0.26"
    }
  }
}

provider "civo" {
  token  = var.civo_token
  region = var.region
}

 

