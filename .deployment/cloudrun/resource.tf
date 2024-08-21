resource "google_cloud_run_service" "default" {
  name     = var.CLOUDRUN_SERVICE
  location = "us-central1"

  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
        ports {
          container_port = 8080
        }
        resources {
          limits = {
            "cpu"    = "1"
            "memory" = "256Mi"
          }
        }
        env {
          name  = "APP_ENV"
          value = "production"
        }
        env {
          name  = "BEARER_TOKEN_API_DTK2"
          value = "l9kyiodmEO7YVX88jw7vQuvSaBbgzD9J"
        }
        env {
          name  = "DB_USER"
          value = var.DB_USER
        }
        env {
          name  = "DB_PASSWORD"
          value = var.DB_PASSWORD
        }
        env {
          name  = "DB_SERVER"
          value = var.DB_SERVER
        }
        env {
          name  = "DB_DATABASE"
          value = var.DB_DATABASE
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = 0
        "autoscaling.knative.dev/maxScale" = 1
        "run.googleapis.com/vpc-access-connector" = "conect-sql"
      }

    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Set traffic public
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.default.location
  project     = google_cloud_run_service.default.project
  service     = google_cloud_run_service.default.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
