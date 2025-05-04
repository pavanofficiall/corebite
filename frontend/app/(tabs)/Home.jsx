import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  Pressable, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  StatusBar
} from 'react-native';
import images from '../constants/image';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../assets/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const SPACING = width * 0.05;

const Home = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  
  // For carousel auto-scrolling
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const carouselItems = [
    {
      id: '1',
      title: 'Full Body Workout',
      description: 'Complete workout for your entire body',
      image: images.OnboardingImg1,
      duration: '30 min',
      level: 'Beginner'
    },
    {
      id: '2',
      title: 'HIIT Training',
      description: 'High intensity interval training',
      image: images.img1,
      duration: '20 min',
      level: 'Intermediate'
    },
    {
      id: '3',
      title: 'Strength Builder',
      description: 'Build muscle and increase strength',
      image: images.OnboardingImg3,
      duration: '45 min',
      level: 'Advanced'
    }
  ];
  
  const workoutCategories = [
    { id: '1', name: 'Chest', image: images.OnboardingImg3, route: '(workout)/Exercises' },
    { id: '2', name: 'Back', image: images.back, route: '(auth)/Sign-in' },
    { id: '3', name: 'Leg', image: images.OnboardingImg1, route: '(auth)/Sign-in' },
    { id: '4', name: 'Arm', image: images.arm, route: '(auth)/Sign-in' }
  ];
  
  // Stats data
  const statsData = {
    streak: 3,
    workoutsCompleted: 12,
    caloriesBurned: 1240
  };
  
  // Auto scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < carouselItems.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true
        });
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <View className="flex-1 bg-gray-200 dark:bg-[#232323]">
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header
      <View className="pt-12 px-6 pb-2 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 dark:text-gray-400 text-sm">Welcome back</Text>
          <Text className="text-gray-900 dark:text-white text-xl font-bold">Alex Johnson</Text>
        </View>
        
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Ionicons name="notifications-outline" size={24} color={theme === 'dark' ? '#10b981' : '#10b981'} />
            <View className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></View>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <View className="w-10 h-10 rounded-full bg-gray-300 dark:bg-[#3a3a3a] overflow-hidden">
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-full h-full" 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View> */}
      
      {/* Main Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Stats Card  */}
        {/* <View className="mx-6 mt-6 bg-white dark:bg-[#2a2a2a] rounded-2xl p-4 shadow-sm">
          <Text className="text-gray-900 dark:text-white font-semibold mb-3">Your Stats</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <View className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-[#3a3a3a] items-center justify-center mb-1">
                <FontAwesome5 name="fire" size={16} color={theme === 'dark' ? '#10b981' : '#10b981'} />
              </View>
              <Text className="text-emerald-500 dark:text-[#10b981] font-bold">{statsData.caloriesBurned}</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">Calories</Text>
            </View>
            
            <View className="items-center">
              <View className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-[#3a3a3a] items-center justify-center mb-1">
                <MaterialIcons name="fitness-center" size={18} color={theme === 'dark' ? '#10b981' : '#10b981'} />
              </View>
              <Text className="text-emerald-500 dark:text-[#10b981] font-bold">{statsData.workoutsCompleted}</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">Workouts</Text>
            </View>
            
            <View className="items-center">
              <View className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-[#3a3a3a] items-center justify-center mb-1">
                <Ionicons name="calendar" size={18} color={theme === 'dark' ? '#10b981' : '#10b981'} />
              </View>
              <Text className="text-emerald-500 dark:text-[#10b981] font-bold">{statsData.streak}</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">Day Streak</Text>
            </View>
          </View>
        </View>
         */}
        {/* Quick Start Section */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-6 mb-3">
            <Text className="text-emerald-500 dark:text-[#10b981] text-xl font-bold">Quick Start</Text>
            <TouchableOpacity>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Enhanced Carousel */}
          <Animated.FlatList
            ref={flatListRef}
            data={carouselItems}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: SPACING }}
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING)
              );
              setCurrentIndex(index);
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (CARD_WIDTH + SPACING),
                index * (CARD_WIDTH + SPACING),
                (index + 1) * (CARD_WIDTH + SPACING),
              ];
              
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });
              
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
              });
              
              return (
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('(workout)/Exercise')}
                >
                  <Animated.View
                    style={{
                      width: CARD_WIDTH,
                      marginRight: SPACING,
                      transform: [{ scale }],
                      opacity,
                    }}
                    className="bg-white dark:bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-md"
                  >
                    <View className="relative">
                      <Image
                        source={item.image}
                        className="w-full h-48"
                        style={{ resizeMode: 'cover' }}
                      />
                      <View className="absolute bottom-0 left-0 right-0 bg-black/40 p-4">
                        <Text className="text-white font-bold text-xl">{item.title}</Text>
                        <Text className="text-white text-sm opacity-90">{item.description}</Text>
                      </View>
                    </View>
                    
                    <View className="p-3 flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={16} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                        <Text className="text-gray-700 dark:text-gray-300 ml-1">{item.duration}</Text>
                      </View>
                      
                      <View className="flex-row items-center">
                        <Ionicons name="fitness-outline" size={16} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                        <Text className="text-gray-700 dark:text-gray-300 ml-1">{item.level}</Text>
                      </View>
                      
                      <TouchableOpacity 
                        className="bg-emerald-500 dark:bg-[#10b981] px-3 py-1 rounded-full"
                        onPress={() => navigation.navigate('(workout)/Exercise')}
                      >
                        <Text className="text-white dark:text-[#232323] font-medium">Start</Text>
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />
          
          {/* Carousel Indicators */}
          <View className="flex-row justify-center mt-3">
            {carouselItems.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  currentIndex === index 
                    ? 'bg-emerald-500 dark:bg-[#10b981] w-4' 
                    : 'bg-gray-300 dark:bg-[#3a3a3a]'
                }`}
              />
            ))}
          </View>
        </View>
        
        {/* Discover Section */}
        <View className="mt-8 px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-emerald-500 dark:text-[#10b981] text-xl font-bold">Discover</Text>
            <TouchableOpacity>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row flex-wrap justify-between">
            {workoutCategories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                className="w-[48%] mb-4"
                onPress={() => navigation.navigate(category.route)}
              >
                <View className="bg-white dark:bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-sm">
                  <View className="relative">
                    <Image 
                      source={category.image} 
                      className="w-full h-32" 
                      style={{ resizeMode: 'cover' }}
                    />
                    <View className="absolute inset-0 bg-black/20" />
                  </View>
                  
                  <View className="p-3 items-center">
                    <Text className="text-gray-900 dark:text-white font-bold text-lg">{category.name}</Text>
                    <Text className="text-emerald-500 dark:text-[#10b981] text-xs">5 workouts</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Trending Workouts */}
        <View className="mt-4 px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-emerald-500 dark:text-[#10b981] text-xl font-bold">Trending</Text>
            <TouchableOpacity>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            className="bg-white dark:bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-sm mb-3"
            onPress={() => navigation.navigate('(workout)/Exercise')}
          >
            <View className="flex-row">
              <Image 
                source={images.OnboardingImg1} 
                className="w-24 h-24" 
                style={{ resizeMode: 'cover' }}
              />
              <View className="flex-1 p-3 justify-center">
                <Text className="text-gray-900 dark:text-white font-bold">30-Day Challenge</Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">Transform in just 30 days</Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star-half" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">(128)</Text>
                </View>
              </View>
              <View className="justify-center pr-3">
                <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#10b981' : '#10b981'} />
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-white dark:bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-sm"
            onPress={() => navigation.navigate('(workout)/Exercise')}
          >
            <View className="flex-row">
              <Image 
                source={images.arm} 
                className="w-24 h-24" 
                style={{ resizeMode: 'cover' }}
              />
              <View className="flex-1 p-3 justify-center">
                <Text className="text-gray-900 dark:text-white font-bold">Arms Sculptor</Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">Defined arms in 2 weeks</Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Ionicons name="star-outline" size={14} color={theme === 'dark' ? '#10b981' : '#10b981'} />
                  <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">(94)</Text>
                </View>
              </View>
              <View className="justify-center pr-3">
                <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#10b981' : '#10b981'} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
         {/* Floating Button */}
            <TouchableOpacity onPress={() => (navigation.navigate('(logFood)/LogFood'))} className="absolute bottom-[44px] right-5 bg-[#10B981] p-3 rounded-full shadow-lg">
              <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
    </View>
  );
};

export default Home;