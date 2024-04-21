import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryBtn from './cartOrder/CategoryBtn';
import { updatePosHomeState } from 'state/posHomeState';
import { UserStoreStateProps } from 'types/global';

interface CategorySectionProps {
    catalog: UserStoreStateProps;
    section: string;
}

const CategorySection = ({
    catalog,
    section,
}: CategorySectionProps) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.lblTxt}>Menu Category</Text>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          {catalog.categories?.map((category, index) => {
            if (
              catalog.products.filter(
                (x) => x.category === category && x.hasImage
              ).length > 0
            ) {
              return (
                <CategoryBtn
                  key={index}
                  category={category}
                  onPress={() => {
                   updatePosHomeState({ section: category });
                  }}
                  isSelected={section === category}
                  style={styles.activeCategoryBtn}
                  imageUrl={
                    catalog.products[
                      catalog.products.findIndex(
                        (x) => x.category === category && x.hasImage
                      )
                    ]?.imageUrl ?? null
                  }
                />
              );
            } else {
              return (
                <CategoryBtn
                  key={index}
                  category={category}
                  onPress={() => {
                    updatePosHomeState({ section: category });
                  }}
                  isSelected={section === category}
                  style={styles.categoryBtn}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default CategorySection

const styles = StyleSheet.create({
  categoryContainer: {
    width: "93%",
    height: 178,
    justifyContent: "space-between",
  },
  lblTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
    marginBottom: 10,
  },
  scrollArea: {
    alignSelf: "stretch",
  },
  scrollArea_contentContainerStyle: {
    width: "93%",
    height: 156,
    paddingBottom: 5,
  },
  activeCategoryBtn: {
    width: 125,
    marginRight: 15,
    height: 150,
  },
  categoryBtn: {
    width: 125,
    marginRight: 18,
    height: 150,
  },
});