import React from 'react';
import './tags.scss';
import Textfield from './TextField';

import { TextField as 
    //MatTextField
     withStyles, Chip, Typography } from '@material-ui/core';

const Tags = (props: any) => {
    const [tags, setTags] = React.useState(Array());

    const addTags = (event: any) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            setTags([...tags, event.target.value.toLowerCase()]);
            props.selectedTags([...tags, event.target.value.toLowerCase()]);
            event.target.value = '';
        }
    };
    const removeTags = (index: any) => {
        setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
    };
    return (
        <>
            <Textfield
                label="Add tags"
                onKeyUp={(event) => addTags(event)}
            />
            <div className="tags-input">
                <ul id="tags">
                    <Typography variant="h6" style={{ color: '#fafafa', marginRight: '5px', fontSize: '20px' }}>
                        Selected
                        <span style={{ color: '#f56920' }}> tags:</span>
                    </Typography>
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <Chip
                                label={tag}
                                onDelete={() => removeTags(index)}
                                variant="outlined"
                                color="primary"
                                style={{ color: '#fafafa' }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default Tags;
