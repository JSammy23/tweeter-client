import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import Compressor from 'compressorjs';
import { Button, CircularProgress, Snackbar } from '@mui/material';

const ImageUpload = forwardRef(({ onUpload }, ref) => {
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Ref to the hidden file input
    const fileInputRef = useRef(null);

    // Expose openFilePicker to the parent component
    useImperativeHandle(ref, () => ({
        openFilePicker: () => {
            fileInputRef.current.click();
        }
    }));

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            new Compressor(file, {
                quality: 0.6,
                success: (compressedImage) => {
                    setLoading(false);
                    onUpload(compressedImage)
                        .then(() => {
                            setSnackbarMessage('Image uploaded successfully!');
                            setOpenSnackbar(true);
                        })
                        .catch((error) => {
                            setSnackbarMessage('Failed to upload image.');
                            setOpenSnackbar(true);
                        });
                },
                error: () => {
                    setLoading(false);
                    setSnackbarMessage('Error in image compression.');
                    setOpenSnackbar(true);
                },
            });
        }
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
            />
            {/* Button can be optional based on your design */}
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Upload Image'}
                </Button>
            </label>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </div>
    );
});

// Set display name for the component
ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
