import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Image, ImageBackground, FlatList } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import moviesService from '../../services/moviesService';
import LoadingScreen from '../../templates/loadingScreen';
import { SectionMovieTitle } from '../movies/styles';
import { BannerFeaturesView, DateText, DateView, FeaturesRatingView, InfoFeaturesText, InfoFeaturesView, MainFeatures, RenderItemView } from './styles';


const Features: React.FC = () => {
  const [dataFeatures, setDataFeatures] = useState<dataMoviesModel[]>([])
  const imagesRequested = useRef(0)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(true)
  const themeContext = useContext<themeModel>(ThemeContext)

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesFeatures = await moviesService.getMovie("features")

      if (moviesFeatures == null) {
        return
      }
      setDataFeatures(moviesFeatures.slice(0, 9))
    }

    loadingMovies()
  }, [])


  const isImagesRequested = () => {
    imagesRequested.current += 1

    if (imagesRequested.current == dataFeatures.length) {
      Animated.timing(fadeLoading, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setDisplayLoading(false)
      })
    }
  }

  const renderItemFlatList = ({ item }: { item: dataMoviesModel }) => {
    return (
      <RenderItemView>
        <ImageBackground
          onLoad={() => isImagesRequested()}
          source={{ uri: item.poster_path }}
          style={{ width: 130, height: 200 }}>

          <LinearGradient
            colors={['#00000000', '#00000000', themeContext.background]}
            style={{ height: '100%', width: '100%' }}>
          </LinearGradient>

          <DateView>
              <DateText>
                {item.release_date}
              </DateText>
          </DateView>
        </ImageBackground>
      </RenderItemView>
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {dataFeatures.length != 0 &&
        <MainFeatures>
          <BannerFeaturesView>
            <ImageBackground
              onLoad={(e) => isImagesRequested()}
              style={{ width: '100%', height: 240 }}
              source={{ uri: dataFeatures[0].backdrop_path }}>

              <LinearGradient
                colors={['#00000000', themeContext.background]}
                style={{ height: '100%', width: '100%' }}>
              </LinearGradient>

              <InfoFeaturesView>
                <InfoFeaturesText style={{ fontWeight: "500" }}>
                  {dataFeatures[0].title}
                </InfoFeaturesText>

                <InfoFeaturesText style={{ fontSize: 14 }}>
                  {dataFeatures[0].genre_ids[0] &&
                    dataFeatures[0].genre_ids[0]}
                  {dataFeatures[0].genre_ids[1] &&
                    " - " + dataFeatures[0].genre_ids[1]}
                  {dataFeatures[0].genre_ids[2] &&
                    " - " + dataFeatures[0].genre_ids[2]}
                </InfoFeaturesText>

                <FeaturesRatingView>
                  <InfoFeaturesText style={{ fontSize: 14, paddingBottom: 0 }}>
                    {dataFeatures[0].release_date}
                  </InfoFeaturesText>
                </FeaturesRatingView>
              </InfoFeaturesView>
            </ImageBackground>
          </BannerFeaturesView>

          <SectionMovieTitle>Features</SectionMovieTitle>
          <FlatList
            horizontal
            data={dataFeatures}
            renderItem={renderItemFlatList}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(movie) => String(movie.id)}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
        </MainFeatures>
      }
    </>

  )
}

export default Features;