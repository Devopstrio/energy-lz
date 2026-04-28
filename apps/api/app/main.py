import logging
import time
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("energy-lz-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Energy Landing Zone API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/landingzone/provision")
def provision_lz(site_id: str, blueprint_type: str):
    logger.info(f"Provisioning energy landing zone for {site_id} using {blueprint_type}")
    return {"status": "IN_PROGRESS", "job_id": "lz_77_delta", "estimated_completion": "12m"}

@app.get("/sites/status")
def get_sites_status():
    return [
        {"id": "grid-east", "name": "East Coast Grid", "status": "STABLE", "score": 0.98},
        {"id": "refinery-tx", "name": "Texas Refinery", "status": "MAINTENANCE", "score": 0.85},
        {"id": "wind-offshore", "name": "Offshore Wind A", "status": "OPTIMIZED", "score": 0.99}
    ]

@app.get("/identity/summary")
def get_identity_summary():
    return {
        "active_machine_identities": 154200,
        "human_identities": 12400,
        "sso_integration_status": "ENFORCED",
        "industrial_trust_level": "ZERO_TRUST"
    }

@app.get("/costs/summary")
def get_costs_summary():
    return {
        "total_monthly_spend": 1450000,
        "site_funded_spend": 1200000,
        "savings_identified": 145000,
        "budget_variance": "-1.8%"
    }

@app.get("/compliance/status")
def get_compliance_status():
    return {
        "nerc_cip_guardrails": "ENFORCED",
        "isa_62443_guardrails": "ENFORCED",
        "overall_score": 0.97,
        "policy_drift_detected": False
    }

@app.get("/scores/summary")
def get_scores_summary():
    return {
        "global_readiness_score": 0.95,
        "sustainability_rating": "LEADER",
        "operational_uptime": "99.999%",
        "industrial_risk_level": "LOW"
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_managed_sites": 142,
        "active_iot_gateways": 850,
        "active_digital_twins": 12,
        "platform_status": "READY"
    }
