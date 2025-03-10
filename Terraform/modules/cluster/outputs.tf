output "cluster_id" {
  description = "The ID of the created Kubernetes cluster"
  value       = civo_kubernetes_cluster.driif_cluster.id
}

output "cluster_name" {
  description = "The name of the created Kubernetes cluster"
  value       = civo_kubernetes_cluster.driif_cluster.name
}