terraform {
  required_providers {
    civo = {
      source  = "civo/civo"
      version = "~> 1.0.0"
    }
  }
}

resource "civo_firewall" "driif_firewall" {
  name        = "${var.project}-${var.env}-firewall"
  network_id  = var.network_id

  ingress_rule {
    label      = "k8s-api"
    protocol   = "tcp"
    port_range = "6443"
    cidr       = ["0.0.0.0/0"]
    action     = "allow"
  }

  ingress_rule {
    label      = "ssh"
    protocol   = "tcp"
    port_range = "22"
    cidr       = ["0.0.0.0/0"]
    action     = "allow"
  }

  ingress_rule {
    label      = "all-ports"
    protocol   = "tcp"
    port_range = "1-65535"
    cidr       = ["0.0.0.0/0"]
    action     = "allow"
  }

  egress_rule {
    label      = "all-traffic"
    protocol   = "tcp"
    port_range = "1-65535"
    cidr       = ["0.0.0.0/0"]
    action     = "allow"
  }
}