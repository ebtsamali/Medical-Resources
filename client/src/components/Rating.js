import React from 'react';
import Rating from '@material-ui/lab/Rating';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {

    const { rating, setRating } = props;
    //   const [value, setValue] = React.useState(0);

    return (
        <div>
            <Box component="fieldset" borderColor="transparent">
                {/* <Typography component="legend">Controlled</Typography> */}
                <Rating
                    name={props.readOnly ? "read-only" : "simple-controlled"}
                    readOnly={props.readOnly}
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                        props.onChangeRating(newValue);
                    }}
                    precision={props.precision}
                />
            </Box>
        </div>
    );

}