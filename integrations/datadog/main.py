import requests
import json

API_KEY="YOUR_API_KEY"
APP_KEY="YOUR_APP_KEY"
BELA_KEY="YOUR_BELA_KEY"
ENV="YOUR_ENVIRONMENT"
START_TS="START_TS_STRING"
END_TS="END_TS_STRING"
API_URL="https://bela-client-domain.jux.house/architecture" # Change client-domain to actual domain provided by BELA

def fetch_datadog_dependencies(api_key, app_key, env, start, end):
    headers = {
        "DD-API-KEY": f"{api_key}",
        "DD-APPLICATION-KEY": f"{app_key}"
    }
    params = {
        "env": env,
        "start": start,
        "end": end
    }
    url = "https://api.datadoghq.com/api/v1/service_dependencies"
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data from Datadog: {response.content}")
    
    return json.loads(response.content)

datadog_data = fetch_datadog_dependencies(API_KEY, APP_KEY, ENV, START_TS, END_TS)

def transform_to_target_format(datadog_data):
    transaction = []
    service_dependencies = {}
    
    # Add services as elements
    for service in datadog_data.keys():
        transaction.append({
            "op": "upsert-element",
            "path": f"service/{service}"
        })
        
    # Add dependencies
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

transformed_data = transform_to_target_format(datadog_data)

def send_to_target_api(api_key, data):
    url = API_URL
    headers = {
        "Authentication": f"{api_key}"
    }
    response = requests.patch(url, headers=headers, json=data)
    
    if response.status_code != 200:
        raise Exception(f"Failed to send data: {response.content}")

    return response.content

# Send the data
send_to_target_api(BELA_KEY, transformed_data)
