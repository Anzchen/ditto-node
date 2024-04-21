// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQCSCvE5GYHB2kMyRwctl_KK8lC7hV2uj7Pzg01UHsVdJlqSARpsVr28R-JNpRlITiZp8C0McDUHK0G8TX5hQXtTM7aIvSDJXSODpczkNYIIOtD94-hjecOAUSFFgBxMOyF-p7v1Ixb-Pp6l3yz-B_TVKKLihRv3Sqx-VJsCLwBbK3xP5FT-tUn0VYg6AP5sCLkjO74nBt0QUFx8pvIexqFmcqrRWxNIzyaw3m5lLEdHa1D9Hk5tQFEC0opGCdH-AxuoaTHgj0LS4myMOAthn-_D";
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

const topTracksIds = [
  "3GJTkh9w9IBLS0vszvekyL",
  "6g1NEjaKB6Tw5lRbLauvLu",
  "04CyMEHliadfQWMUJb1w99",
  "1rllCR1VL8FLZN5Q5yvW36",
  "2AwBq3Ecjq5IfpC5f897VY",
];

async function getRecommendations() {
  return (
    await fetchWebApi(
      `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(",")}`,
      "GET"
    )
  ).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);
