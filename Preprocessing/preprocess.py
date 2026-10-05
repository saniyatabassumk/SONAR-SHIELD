import cv2


def preprocess_image(input_path, output_path):

    # Read image
    image = cv2.imread(input_path)

    if image is None:
        print("ERROR: Image not found!")
        return False

    print("Image loaded successfully!")
    print("Original image shape:", image.shape)

    # Resize only if required
    if image.shape[:2] != (640, 640):
        image = cv2.resize(image, (640, 640))
        print("Image resized to 640 x 640")

    # Noise reduction
    denoised = cv2.GaussianBlur(image, (5, 5), 0)

    # Convert BGR to LAB
    lab = cv2.cvtColor(denoised, cv2.COLOR_BGR2LAB)

    # Split LAB channels
    l, a, b = cv2.split(lab)

    # Apply CLAHE only to brightness channel
    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    enhanced_l = clahe.apply(l)

    # Merge channels back
    enhanced_lab = cv2.merge((enhanced_l, a, b))

    # Convert LAB back to BGR
    enhanced = cv2.cvtColor(enhanced_lab, cv2.COLOR_LAB2BGR)

    # Save final 3-channel image
    cv2.imwrite(output_path, enhanced)

    print("Preprocessing completed!")
    print("Output saved:", output_path)
    print("Final image shape:", enhanced.shape)

    return True


# Test image
preprocess_image(
    "000041_jpg.rf.cdc982398ad34aea28aa660cd2ac6ed0.jpg",
    "final_sonar_color.jpg"
)