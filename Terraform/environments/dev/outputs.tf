# outputs.tf
output "cluster_id" {
  description = "The ID of the created Kubernetes cluster"
  value       = module.cluster.cluster_id
}

output "cluster_name" {
  description = "The name of the created Kubernetes cluster"
  value       = module.cluster.cluster_name
}

output "network_id" {
  description = "The ID of the created network"
  value       = module.network.network_id
}

output "firewall_id" {
  description = "The ID of the created firewall"
  value       = module.firewall.firewall_id
}