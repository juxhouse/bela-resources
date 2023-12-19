import json
import requests
import time


# Datadog params:
API_KEY="YOUR_API_KEY"
APP_KEY="YOUR_APP_KEY"
ENV="YOUR_ENVIRONMENT"

# BELA params:
BELA_TOKEN="YOUR-BELA-TOKEN"
BELA_HOST="https://your.bela.host"


def fetch_datadog_dependencies():
    headers = {
        "DD-API-KEY": API_KEY,
        "DD-APPLICATION-KEY": APP_KEY
    }
    params = {
        "env": ENV,
        "start": int(time.time()) - (60 * 60 * 24 * 31 * 2) # Two months ago
    }
    url = "https://api.datadoghq.com/api/v1/service_dependencies"
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data from Datadog: {response.content}")
    
    return json.loads(response.content)


def transform_to_target_format(datadog_data):
    transaction = []
    service_dependencies = {}
    
    # Add services as elements to transaction
    for service in datadog_data.keys():
        transaction.append({
            "op": "upsert-element",
            "path": f"service/{service}"
        })
        
    # Collect dependencies
    for service, details in datadog_data.items():
        for call in details.get("calls", []):
            if service not in service_dependencies:
                service_dependencies[service] = []
            service_dependencies[service].append({
                "to": f"service/{call}"
            })

    # Add dependencies to transaction
    for service, dependencies in service_dependencies.items():
        transaction.append({
            "op": "add-dependencies",
            "from": f"service/{service}",
            "dependencies": dependencies
        })
            
    # Example of how to add containments
    # transaction.append({
    #     "op": "add-containments",
    #     "container": "domain/domain1",
    #     "contents": ["service/element1", "service/element2"]
    # })
    
    return {
        "source": "datadog",
        "transaction": transaction
    }


def send_to_target_api(body):
    url = BELA_HOST + "/architecture"
    headers = {
        "Authorization": BELA_TOKEN
    }
    response = requests.patch(url, headers=headers, json=body)
    
    if response.status_code != 200:
        raise Exception(f"Failed to send data: {response.content}")

    return response.content


datadog_data = fetch_datadog_dependencies()
bela_transaction = transform_to_target_format(datadog_data)
send_to_target_api(bela_transaction)
