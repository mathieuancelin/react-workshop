/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes, Image, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { fetchWine, fetchWineLiked, setTitle, toggleWineLiked } from '../actions';
import { styles } from './style';
import { Comments } from './comments';
import { apiHost } from '../actions';

const mapStateToProps = (state) => {
  return {
    currentWine: state.currentWine.wine,
    liked: state.currentWine.liked
  };
}

const Label = React.createClass({
  propTypes: {
    children: PropTypes.string
  },
  render() {
    return (
      <Text style={styles.label}>{this.props.children}</Text>
    );
  }
});

const LabelValue = React.createClass({
  propTypes: {
    children: PropTypes.string
  },
  render() {
    return (
      <Text style={styles.labelValue}>{this.props.children}</Text>
    );
  }
});

export const Wine = connect(mapStateToProps)(React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    liked: PropTypes.bool,
    region: PropTypes.string,
    wine: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.oneOf(['Rouge', 'Blanc', 'Rosé', 'Effervescent', 'Moelleux']),
      appellation: PropTypes.shape({
        name: PropTypes.string,
        region: PropTypes.string
      }),
      grapes: PropTypes.arrayOf(PropTypes.string)
    })
  },
  componentDidMount() {
    this.props.dispatch(fetchWine(this.props.wine.id)).then(() => {
      this.props.dispatch(setTitle(this.props.wine.name));
      this.props.dispatch(fetchWineLiked(this.props.wine.id));
    });
  },

  handleToggleLike() {
    this.props.dispatch(toggleWineLiked(this.props.wine.id));
  },

  render() {
    const { wine, liked } = this.props;
    return (
      <ScrollView style={styles.scene}>
        <View style={styles.container}>
          <Image style={styles.winePic} source={{ uri: `http://${apiHost}:3000/api/wines/${this.props.wine.id}/image` }} />
          <View style={styles.flexColumn}>
            <View style={styles.bottomSpaced}>
              <Text style={styles.wineTitle}>{wine.name}</Text>
            </View>
            <Label>Type</Label>
            <LabelValue>{wine.type}</LabelValue>
            <Label>Région</Label>
            <LabelValue>{wine.appellation.region}</LabelValue>
            <Label>Appellation</Label>
            <LabelValue>{wine.appellation.name}</LabelValue>
            <Label>Cépages</Label>
            <LabelValue>{wine.grapes.join(', ')}</LabelValue>
            <TouchableWithoutFeedback onPress={this.handleToggleLike}>
              <View onPress={this.handleToggleLike} style={styles.likeView}>
                <Image onPress={this.handleToggleLike} style={styles.likePic} source={liked ? require('./liked.png') : require('./unliked.png')} />
                <Text onPress={this.handleToggleLike} style={styles.likeTitle}>{liked ? 'Unlike' : 'Like'}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Comments wineId={this.props.wine.id} />
      </ScrollView>
    );
  }
}));
