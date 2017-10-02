document.addEventListener('init', function(event) {
    var page = event.target;
    
    if(page.id == "map") {
      // Geolocation APIに対応している
      if (navigator.geolocation) {
        // 現在地を取得
        navigator.geolocation.getCurrentPosition(
          // 取得成功した場合
          function(position) {
            // 現在地の緯度・経度を変数に格納
            var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // マップオプションを変数に格納
            var mapOptions = {
                center: new google.maps.LatLng(41.677503, 140.435202),    //地図上で表示させる観光スポットの緯度経度
                zoom: 15,                                                 //地図の倍率
                mapTypeId: google.maps.MapTypeId.ROADMAP                  //地図の種類
            };
            // マップオブジェクト作成
            var map = new google.maps.Map(
              document.getElementById("map_canvas"), // マップを表示する要素
              mapOptions         // マップオプション
            );
            //　マップにマーカーを表示する(現在地)
            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            var here_marker = new google.maps.Marker({
              map : map,             // 対象の地図オブジェクト
              position : mapLatLng ,  // 緯度・経度
              icon: image
            });
            
            //　マップにマーカーを表示する(観光スポット)
            var here_latlng = new google.maps.LatLng(41.677503, 140.435202);
            var spot_marker = new google.maps.Marker({
              map : map,             // 対象の地図オブジェクト
              position : here_latlng, // 緯度・経度
            });
          },
          // 取得失敗した場合
          function(error) {
            // エラーメッセージを表示
            switch(error.code) {
              case 1: // PERMISSION_DENIED
                alert("位置情報の利用が許可されていません");
                break;
              case 2: // POSITION_UNAVAILABLE
                alert("現在位置が取得できませんでした");
                break;
              case 3: // TIMEOUT
                alert("タイムアウトになりました");
                break;
              default:
                alert("その他のエラー(エラーコード:"+error.code+")");
                break;
            }
          }
        );
      // Geolocation APIに対応していない
      } else {
        alert("この端末では位置情報が取得できません");
      }
    }
    
});
