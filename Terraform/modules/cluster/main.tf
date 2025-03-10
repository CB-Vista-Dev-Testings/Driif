terraform {
  required_providers {
    civo = {
      source  = "civo/civo"
      version = "~> 1.0.0"
    }
  }
}

resource "civo_kubernetes_cluster" "driif_cluster" {
  name        = "${var.project}-${var.env}-cluster"
  network_id  = var.network_id
  firewall_id = var.firewall_id

  pools {
    label      = "worker-pool"
    size       = "g4s.kube.medium"
    node_count = 6
    
  }
  lifecycle {
    create_before_destroy = true
  }
}