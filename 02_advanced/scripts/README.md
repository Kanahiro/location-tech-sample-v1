# 指定緊急避難場所ダウンロードツール

国土地理院が公開している指定避難場所データは、GeoJSONタイルで配信されています。
これはその全てをダウンロードするスクリプトです。

## 構成

- japan_3857.geojson: 国土数値情報-行政区域データを加工したもの
- download_geojsontile.py: スクリプト本体
- skhb.geojson: 本スクリプトでダウンロードしたGeoJSONをひとまとめに整理したGeoJSON

## 使い方

```sh
pip install requests tiletanic
python download_geojsontile.py
```

データ種別ごとに下記のようなフォルダが作成され、内部に全てのGeoJSONタイルが保存されます。

```
├── skhb01
├── skhb02
├── skhb03
├── skhb04
├── skhb05
├── skhb06
├── skhb07
└── skhb08
```