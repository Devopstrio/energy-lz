provider "azurerm" {
  features {}
}

provider "aws" {
  region = var.aws_region
}

resource "azurerm_resource_group" "energy" {
  name     = "rg-${var.project_name}-foundation-${var.environment}"
  location = var.location
}

# --- Industrial Hub (Shared Services) ---

resource "azurerm_virtual_network" "hub" {
  name                = "vnet-industrial-hub-${var.environment}"
  location            = azurerm_resource_group.energy.location
  resource_group_name = azurerm_resource_group.energy.name
  address_space       = ["10.0.0.0/16"]
}

# --- Governance Control Plane (AKS) ---

resource "azurerm_kubernetes_cluster" "energy_k8s" {
  name                = "aks-energy-governance-${var.environment}"
  location            = azurerm_resource_group.energy.location
  resource_group_name = azurerm_resource_group.energy.name
  dns_prefix          = "energy-k8s"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2s_v3"
  }

  identity {
    type = "SystemAssigned"
  }
}

# --- Industrial Metadata Store (Postgres) ---

resource "azurerm_postgresql_flexible_server" "energy" {
  name                   = "psql-energy-metadata-${var.environment}"
  resource_group_name    = azurerm_resource_group.energy.name
  location               = azurerm_resource_group.energy.location
  version                = "13"
  administrator_login    = "energyadmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2ds_v4"
}

# --- Secure Industrial Vault (Key Vault) ---

resource "azurerm_key_vault" "vault" {
  name                        = "kv-energy-${var.environment}"
  location                    = azurerm_resource_group.energy.location
  resource_group_name         = azurerm_resource_group.energy.name
  enabled_for_disk_encryption = true
  tenant_id                   = var.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"
}

# --- Telemetry Data Sink (AWS S3) ---

resource "aws_s3_bucket" "telemetry_data" {
  bucket = "db-energy-telemetry-sink-${var.environment}"
}
