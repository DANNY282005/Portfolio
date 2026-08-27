def test_health_check_returns_ok(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_get_portfolio_overview(client):
    response = client.get("/api/v1/portfolio")

    assert response.status_code == 200
    body = response.json()
    assert body["profile"]["name"] == "Daniel E"
    assert len(body["projects"]) > 0


def test_get_profile(client):
    response = client.get("/api/v1/profile")

    assert response.status_code == 200
    body = response.json()
    assert body["title"] == "AI Engineer | Agentic AI Systems | Backend Developer"
    assert body["openRoles"] == [
        "AI Engineer",
        "Agentic Engineer",
        "Backend Developer",
        "Python Developer",
        "Java Developer",
    ]


def test_get_projects_returns_list(client):
    response = client.get("/api/v1/projects")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert any(project["id"] == "coding-agent" for project in response.json())


def test_download_resume_returns_pdf(client):
    response = client.get("/api/v1/resume")

    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
