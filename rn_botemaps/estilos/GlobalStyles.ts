import { StyleSheet } from 'react-native'

export const Colors = {
  primary: '#de9de9ff',   
  secondary: '#2196F3', 
  background: '#ded7d7ff', 
  cardBackground: '#F3E5F5', 
  text: '#222222',       
  subtitle: '#555555',   
  placeholder:"#8E7A8A"
}

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 15,
    color: Colors.primary,
  },
  listContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground, // nuevo color
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
    marginTop:10,
    marginBottom:10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Colors.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.secondary,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  text:{
    fontSize:14,
    textAlign:"center",
    color: Colors.text
  },
  boton:{
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    paddingVertical:10,
    
    
  },
  detailImage:{
    width:"100%",
    aspectRatio:1
  },
  fullStar:{
    fontSize:16,
    color:"#ffd700"
  },
  emptyStar:{
    fontSize:16,
    color:"#cccccc"
  },
  reviewContainer:{
    color: Colors.cardBackground,
    borderRadius:14,
    shadowColor:"#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    columnGap:20,
    rowGap:4
  },
  textInput:{
    backgroundColor: Colors.cardBackground,
    flex:1,
    borderRadius:14,
    minHeight:44,
    justifyContent:"center",
    fontSize:14,
    paddingHorizontal:16,
    elevation: 4,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

  }
})
