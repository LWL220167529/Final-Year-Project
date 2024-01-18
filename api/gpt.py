import json, re
from openai import OpenAI

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="sk-04p3aal1yvKdVfVmcClKuUlpdB8Z61Nq58n5nPEzbgDWLIP1",
    base_url="https://api.chatanywhere.tech/v1"
)

# 非流式响应
def gpt_35_api(messages: list):
    completion = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
    ai_response_content = completion.choices[0].message.content
    # print("Raw AI response content:", ai_response_content)  # Add this line for debugging
    trip_json = fix_json_and_validate(ai_response_content)
    if trip_json is not None:
      # print(json.dumps(trip_json, indent=2))
        return trip_json
    else:
      print("Failed to correct the response into valid JSON.")




def gpt_35_api_stream(messages: list):
    stream = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages,
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
          print(chunk.choices[0].delta.content, end="")

def fix_json_and_validate(ai_response_content):
    # Remove markdown code block backticks and any leading/trailing whitespaces
    cleaned_content = re.sub(r'^```json\n|\n```$', '', ai_response_content, flags=re.MULTILINE).strip()

    try:
        itinerary_json = json.loads(cleaned_content)
        return itinerary_json
    except json.JSONDecodeError as e:
        print("The response is not in valid JSON format.")
        print("Error:", e)
        return None
    
content = "I'm planning a three-day, two-night trip to Japan. I'll arrive at Tokyo (HND-Haneda), stay at Fuji Onsenji Yumedono, and visit attractions including Mitama no Yu, Kanzo Yashiki, Manns Wines Katsunuma Winery, Michi-no-Eki Toyotomi, Gourmet Strawberry Kan Maeda, and the Yamanashi Prefecture Archaeological Museum. I need a detailed itinerary including transportation options for each destination and introduce the content of the event. The itinerary should start with my arrival at Tokyo Haneda Airport, include transportation to Fuji Onsenji Yumedono and check-in hotel, and cover all the attractions I plan to visit. Please present this in a structured JSON format with keys for 'trip'{ 'duration', 'arrival_city', 'arrival_airport', 'accommodation', 'itinerary':[{'day', 'activities':[{'name','transportation:{'type','details}','activities_content'}]}], with type and details for each mode of transport,such as Take the JR Yamanote Line from Tokyo Haneda Airport to Shinagawa Station, then transfer to the JR Keihin-Tohoku Line to Oimachi Station. From Oimachi Station, walk to Mitama no Yu."

messages3 = [
    {
        "role": "system",
        "content": "You are a travel planning assistant, skilled in creating detailed itineraries including transportation options. Provide the plan in a structured format suitable for converting to JSON, ensuring consistent keys for database storage."
    },
    {
        "role": "user",
        "content": content
    }
]


def gpt_plan_trip():
    result = gpt_35_api(messages3)
    return result