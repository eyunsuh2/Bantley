let championByIdCache = {};
let championJson = {};
let version

async function getLatestChampionDDragon(language = "ko_KR") {

  if (championJson[language])
    return championJson[language];

  let response;
  let versionIndex = 0;
  do { // I loop over versions because 9.22.1 is broken
    version = (await fetch("http://ddragon.leagueoflegends.com/api/versions.json").then(async(r) => await r.json()))[versionIndex++];

    response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
  }
  while (!response.ok)

  championJson[language] = await response.json();
  return championJson[language];
}

async function getChampionByKey(key, language = "ko_KR") {
  // Setup cache
  if (!championByIdCache[language]) {
    let json = await getLatestChampionDDragon(language);

    console.log(json)

    championByIdCache[language] = {};
    for (var championName in json.data) {
      if (!json.data.hasOwnProperty(championName))
        continue;

      const champInfo = json.data[championName];
      championByIdCache[language][champInfo.key] = champInfo;
    }
  }

  return championByIdCache[language][key];
}

async function getChampionImageLinkByKey(key) {
  let name = await getChampionByKey(key, 'en_US')
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name.id}.png`;
}

// NOTE: IN DDRAGON THE ID IS THE CLEAN NAME!!! It's also super-inconsistent, and broken at times.
// Cho'gath => Chogath, Wukong => Monkeyking, Fiddlesticks => Fiddlesticks/FiddleSticks (depending on what mood DDragon is in this patch)
async function getChampionByID(name, language = "ko_KR") {
  return await getLatestChampionDDragon(language)[name];
}

export default getChampionImageLinkByKey;