import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class SearchInput extends Component {
    state = {
        text: ''
    }

    handleChangeText = (text) => {
        this.setState({ text });
    }

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;
        if (text.trim() === "") return;

        onSubmit(text);

        this.setState({ text: '' });
    };

    render() {
        const { placeholder } = this.props;
        const { text } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    placeholder={placeholder}
                    value={text}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    clearButtonMode="always"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#666',
        height: 40,
        width: 300,
        marginTop: 20,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    textInput: {
        color: 'white',
        flex: 1
    }
});

SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

SearchInput.defaultProps = {
    placeholder: ''
};

export default SearchInput;