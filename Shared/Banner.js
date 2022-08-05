import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
import { SITE_URL, UPLOAD_URL } from '../Shared/variables'

var { width } = Dimensions.get('window')

const Banner = () => {
  const [bannerData, setBannerData] = useState([])

  useEffect(() => {
    setBannerData([
      `${SITE_URL}${UPLOAD_URL}medium_336.png`,
      `${SITE_URL}${UPLOAD_URL}medium_baking.png`,
      `${SITE_URL}${UPLOAD_URL}medium_berries-redux.png`,
      `${SITE_URL}${UPLOAD_URL}medium_birthday-bluesatin-redux.png`,
      `${SITE_URL}${UPLOAD_URL}medium_birthday-tulle-redux.png`,
      `${SITE_URL}${UPLOAD_URL}medium_boot-5.png`,
      `${SITE_URL}${UPLOAD_URL}medium_boot-6.png`,
      `${SITE_URL}${UPLOAD_URL}medium_cap-11.png`,
      `${SITE_URL}${UPLOAD_URL}medium_cap-13.png`,
      `${SITE_URL}${UPLOAD_URL}medium_glove-1.png`,
      `${SITE_URL}${UPLOAD_URL}medium_glove-5.png`,
      `${SITE_URL}${UPLOAD_URL}medium_patriotic-redux.png`,
      `${SITE_URL}${UPLOAD_URL}medium_scarf-3.png`,
      `${SITE_URL}${UPLOAD_URL}medium_scarf-3.png`,
    ])

    return () => {
      setBannerData([])
    }
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={2}>
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode='contain'
                  source={{
                    uri: item
                      ? item
                      : `${SITE_URL}medium_product-placeholder.png`
                  }}
                />
              )
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
})

export default Banner
