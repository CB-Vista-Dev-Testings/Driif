terraform {
  required_providers {
    civo = {
      source  = "civo/civo"
      version = "~> 1.0.0"
    }
  }
}

resource "civo_network" "driif_network" {
  label = "${var.project}-${var.env}-network"
  cidr_v4 = "10.0.0.0/24"
}