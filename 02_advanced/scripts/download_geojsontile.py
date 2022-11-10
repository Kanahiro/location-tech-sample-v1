import json
import os

import tiletanic
import shapely
import requests


def calc_covering_tiles(geom: dict, zoomlevel: int):
    tiler = tiletanic.tileschemes.WebMercator()
    feature_shape = shapely.geometry.shape(geom)

    covering_tiles_itr = tiletanic.tilecover.cover_geometry(
        tiler, feature_shape, zoomlevel
    )

    return [tile for tile in covering_tiles_itr]


if __name__ == "__main__":
    with open("./japan_3857.geojson") as f:
        japan = json.load(f)
        japan_geom = japan["features"][0]["geometry"]
    tiles = calc_covering_tiles(japan_geom, 10)

    for i in range(8):
        name = f"skhb0{i + 1}"
        os.makedirs(name, exist_ok=True)
        tile_url = (
            "https://cyberjapandata.gsi.go.jp/xyz/" + name + r"/{z}/{x}/{y}.geojson"
        )

        for idx, tile in enumerate(tiles):
            url = (
                tile_url.replace(r"{x}", str(tile.x))
                .replace(r"{y}", str(tile.y))
                .replace(r"{z}", str(tile.z))
            )
            print(f"{name}: {idx + 1} / {len(tiles)}: {url}")

            res = requests.get(url)
            if res.status_code == 200:
                with open(
                    os.path.join(name, f"{tile.z}_{tile.x}_{tile.y}.geojson"), mode="w"
                ) as f:
                    f.write(res.text)
