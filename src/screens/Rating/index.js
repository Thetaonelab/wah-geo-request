/**
 * core package imports
 */
import React, { PureComponent } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

/**
 * external package imports
 */
import StarRating from 'react-native-star-rating';
import { Button } from 'react-native-elements';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

/**
 * style and other imports
 */

import colors from '../../styles/color';
import styles, { width, height } from '../../styles/style';
import text from '../../styles/text';

const stylesheet = StyleSheet.create({
  input: {
    zIndex: 1,
    backgroundColor: colors.white,
    height: 40,
    paddingLeft: 20,
    width: '80%',
    borderColor: colors.truckinBlue,
    color: colors.truckinBlue
  }
});

class CommentsAndRatings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionsStructure: {
        options: [
          { label: 'Poor', value: 0 },
          { label: 'Adequate', value: 1 },
          { label: 'Great', value: 2 }
        ],
        questions: [
          {
            question_title: 'Entrance',
            question_desc: 'Some descrioption ... length text'
          },
          {
            question_title: 'Entrance',
            question_desc: 'Some descrioption ... length text'
          },
          {
            question_title: 'Entrance',
            question_desc: 'Some descrioption ... length text'
          },
          {
            question_title: 'Entrance',
            question_desc: 'Some descrioption ... length text'
          },
          {
            question_title: 'Entrance',
            question_desc: 'Some descrioption ... length text'
          }
        ]
      },
      totalRating: 0,
      overallRatingComments: [],
      overallStarRating: 0,
      reviewStatus: [],
      comment: '',
      loading: true,
      saving: false,
      ratingComments: ''
    };
  }

  setReviewComment = overallStarRating => {
    this.state.overallRatingComments.forEach(elem => {
      if (elem.overall_star_rating === overallStarRating) {
        this.setState({ ratingComments: elem.response });
      }
    });
  };

  setOverallRating = (total, value) => {
    const driverValue = total + value;
    const maxValue =
      this.state.questionsStructure.questions.length *
      this.state.questionsStructure.options[
        this.state.questionsStructure.options.length - 1
      ].value;
    const avgPerQuestion = driverValue / maxValue;
    const overallStarsNotRounded = avgPerQuestion * 5;
    const overallStarRating = Math.round(overallStarsNotRounded * 2) / 2;
    this.setReviewComment(overallStarRating);
    this.setState({ overallStarRating, totalRating: driverValue });
  };

  setRadioValue = (ans, review) => {
    if (ans) {
      const reviewArray = this.state.reviewStatus.filter(
        item => item.cat_id !== review.cat_id
      );
      reviewArray.push(review);

      let total = this.state.totalRating;

      total = total - ans.value;

      this.setOverallRating(total, review.value);

      this.setState({ reviewStatus: reviewArray });
    } else {
      const reviewArray = this.state.reviewStatus;
      reviewArray.push(review);
      this.setState({
        reviewStatus: reviewArray,
        loading: !this.state.loading
      });
      this.setOverallRating(this.state.totalRating, review.value);
    }
  };

  render() {
    // this.setReviewComment(this.state.overallStarRating);
    return (
      <ScrollView
        contentContainerStyle={[
          styles.scrollableParentContainer,
          { backgroundColor: colors.white, minHeight: '100%', padding: 10 }
        ]}>
        <Text
          style={[
            text.heroText,
            {
              color: colors.black,
              marginTop: 10,
              textAlign: 'center'
            }
          ]}>
          Please let us know how the food supplier
        </Text>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <TextInput
            placeholder="TGI Fridays"
            placeholderTextColor={[colors.truckinBlue]}
            underlineColorAndroid={colors.transparent}
            style={[styles.textbox, stylesheet.input]}
            onChangeText={() => {
              //   this.setState({ firstName: value });
            }}
            // value={this.state.firstName}
          />
        </View>

        {this.state.questionsStructure.questions.map(item => {
          return (
            <View
              style={{
                paddingTop: 10,
                marginTop: 10,
                borderTopColor: colors.white,
                borderTopWidth: 2
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    text.primaryText,
                    { color: colors.black, marginBottom: 2 }
                  ]}>
                  {item.question_title}
                </Text>
              </View>
              <Text style={[text.secondaryText, { color: colors.black }]}>
                {item.question_desc}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}>
                {this.state.questionsStructure.options.map((obj, i) => {
                  const ans = this.state.reviewStatus.find(
                    ele => ele.cat_id === item.cat_id
                  );
                  return (
                    <RadioButton labelHorizontal={true} key={i}>
                      {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={
                          ans
                            ? ans.rating_id === obj.rating_id
                              ? true
                              : false
                            : false
                        }
                        onPress={() => {
                          const review = {
                            cat_id: item.cat_id,
                            question_id: item.question_id,
                            rating_id: obj.rating_id,
                            value: obj.value
                          };
                          this.setRadioValue(ans, review);
                        }}
                        borderWidth={1}
                        buttonInnerColor={colors.textColor}
                        buttonOuterColor={
                          ans
                            ? ans.rating_id === obj.rating_id
                              ? colors.textColor
                              : '#000'
                            : '#000'
                        }
                        buttonSize={10}
                        buttonOuterSize={20}
                        buttonStyle={{}}
                        buttonWrapStyle={{ marginLeft: 10 }}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={() => {
                          const review = {
                            cat_id: item.cat_id,
                            question_id: item.question_id,
                            rating_id: obj.rating_id,
                            value: obj.value
                          };
                          this.setRadioValue(ans, review);
                        }}
                        labelStyle={{
                          fontSize: 15,
                          color: colors.textColor
                        }}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  );
                })}
              </View>
            </View>
          );
        })}
        <TextInput
          multiline
          maxLength={1000}
          underlineColorAndroid={colors.transparent}
          placeholder="Leave your comments.."
          placeholderTextColor={colors.secondaryText}
          style={{
            height: height * 0.1,
            marginVertical: 15,
            borderWidth: 1,
            borderColor: colors.buttonGray,
            opacity: 0.7,
            borderRadius: 5,
            padding: 16,
            textAlignVertical: 'top',
            backgroundColor: 'white',
            fontSize: 15,
            fontFamily: 'Nunito-Bold'
          }}
          value={this.state.comment}
          onChangeText={value => {
            this.setState({ comment: value });
          }}
        />
        <Text
          style={[
            text.primaryText,
            { color: colors.black, textAlign: 'center', marginTop: 5 }
          ]}>
          {this.state.ratingComments}
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 15
          }}>
          <View style={{ width: 250 }}>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={30}
              buttonStyle={{ backgroundColor: 'black' }}
              rating={5} //this.state.overallStarRating}
              halfStarEnabled
              starColor={colors.truckinBlue}
              selectedStar={rating => {}}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Button
            disabled={this.state.saving}
            title="Submit"
            loading={this.state.saving}
            buttonStyle={{
              backgroundColor: colors.truckinBlue,
              width: 300,
              height: 45,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
              marginBottom: 100,
              opacity: 0.7
            }}
            textStyle={[text.secondaryText, { color: colors.white }]}
            onPress={() => {
              this.saveReview();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default CommentsAndRatings;
