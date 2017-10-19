import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import CustomTextField from '../common/customTextField';
import CustomTextArea from '../common/customTextArea';
import RaisedButton from 'material-ui/RaisedButton';
import {createPost} from '../../actions/posts/index';
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {CLOUDINARY} from '../../config/config';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeholder: {
        width: 300,
        height: 300,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative'
    },
    close: {
        position: 'absolute',
        top: 20,
        right: 20,
        height: 20,
        width: 20,
        background: 'black',
        color: 'red',
        borderRadius: '50%'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 40,
        width: 300
    }
};

class CreatePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            uploadedFileURL: null
        };
    }

    onImageDrop = (files) => {
        this.setState({uploadedFile: files[0]});
        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                uploadedFileURL: e.target.result
            });
        };
        reader.readAsDataURL(files[0]);
    };

    handleFormSubmit = (values) => {
        const imageData = this.state.uploadedFile
            ? this.prepareImage()
            : null;
        this.props.createPost(values, imageData, this.props.history);
    };

    prepareImage = () => {
        const imageData = new FormData();
        imageData.append("file", this.state.uploadedFile);
        imageData.append("upload_preset", "gdju0r5n");
        imageData.append("ap_key", CLOUDINARY.API);
        imageData.append("timestamp", (Date.now() / 1000 | 0));
        return imageData;
    };

    imagePreview = () => {
        if(this.state.uploadedFileURL) {
            return (
                <div style={{
                    ...styles.placeholder,
                    backgroundImage: `url(${this.state.uploadedFileURL})`
                }}>
                    <ClearIcon
                        onClick={this.removeImage}
                        style={styles.close}
                    />
                </div>
            );
        }
    };

    renderImagePicker = () => {
        if(!this.state.uploadedFileURL) {
            return (
                <Dropzone
                    multiple={false}
                    accept={'image/*'}
                    onDrop={this.onImageDrop}
                    style={{
                        border: 0,
                        display: 'inline-block'
                    }}
                >
                    <RaisedButton icon={<AddPhoto/>}/>
                </Dropzone>
            );
        }
    };

    removeImage = () => {
        this.setState({
            uploadedFileL: "",
            uploadedFileURL: ""
        });
    };

    render() {

        const {handleSubmit} = this.props;

        return (
            <div style={styles.container}>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div>
                        <CustomTextField
                            name={"title"}
                            type={"text"}
                            label={"Title"}
                        />
                    </div>
                    <CustomTextArea
                        name={"content"}
                        label={"Content"}
                        rows={4}
                        rowsMax={10}
                    />
                </form>
                {this.imagePreview()}
                <div style={styles.actions}>
                    <RaisedButton
                        onClick={this.props.history.goBack}
                        label={"Cancel"}
                    />
                    {this.renderImagePicker()}
                    <RaisedButton
                        onClick={handleSubmit(this.handleFormSubmit)}
                        secondary={true}
                        label={"Save"}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        imageUpload: state.imageUpload
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if (!values.content) {
        errors.content = 'Content is required';
    }

    return errors;
};

const createPostForm = reduxForm({
    form: 'createPostForm',
    validate
})(CreatePost);

export default connect(mapStateToProps, {createPost})(withRouter(createPostForm));