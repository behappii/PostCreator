import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  container: {
    flex: 1,
    minWidth: Platform.OS == 'web' ? '50%':0,
    alignSelf: Platform.OS == 'web' ? 'center':'stretch',
    backgroundColor: '#fff'
  },
  input_container: {
    paddingBottom: '5%'
  },
  titles_container: {
  },
  input_field: {
    opacity: 1,
    paddingBottom: '5%',
    marginVertical: '2%',
    marginHorizontal: '2%',
    paddingHorizontal: '3%',
    backgroundColor: '#fdfdfd'
  },
  button_style: {
    paddingHorizontal: '25%'
  },
  text_style: {
    paddingTop: '2%',
    paddingBottom: '5%',
    paddingHorizontal: '3%',
    marginBlock: '1%',
    marginInline: '3%',
    backgroundColor: '#fdfdfd',
  },
  title_style: {
    paddingBottom: '5%',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});