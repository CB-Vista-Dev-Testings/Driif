output "firewall_id" {
  description = "The ID of the created firewall"
  value       = civo_firewall.driif_firewall.id
}