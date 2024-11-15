import streamlit as st

from streamlit_option_menu import option_menu

# Subheader and Text
st.subheader("Welcome to EAS")
st.write("The new AI helper on the market")

# Adding a Markdown Section
st.markdown("### Features")


# Adding a Button
if st.button("Click Me!"):
    st.write("Hello, Streamlit user!")

# Adding an Input Box
user_name = st.text_input("Enter your name:")
if user_name:
    st.write(f"Welcome, {user_name}!")

# Adding a Slider
age = st.slider("Select your age:", 1, 100, 25)
st.write(f"You are {age} years old.")

# Adding a File Uploader
uploaded_file = st.file_uploader("Upload a file:")
if uploaded_file:
    st.write(f"You uploaded: {uploaded_file.name}")



# Session state to track theme
if "theme" not in st.session_state:
    st.session_state.theme = "light"

# Toggle button for light/dark mode
if st.button("Toggle Light/Dark Mode"):
    st.session_state.theme = "dark" if st.session_state.theme == "light" else "light"

# Apply the appropriate theme
if st.session_state.theme == "dark":
    st.markdown("""
        <style>
        body {
            background-color: #1e1e1e;
            color: #ffffff;
        }
        </style>
    """, unsafe_allow_html=True)
else:
    st.markdown("""
        <style>
        body {
            background-color: #ffffff;
            color: #000000;
        }
        </style>
    """, unsafe_allow_html=True)


sidebar_css = """

<style>

    


</style>



"""    