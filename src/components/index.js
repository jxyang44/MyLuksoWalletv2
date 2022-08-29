//larger components
export { default as Sidebar } from "./Sidebar"; //sidebar
export { default as Navbar } from "./Navbar"; //navbar
export { default as UniversalProfile } from "./UniversalProfile"; //universal profile drop down when connected

//basic components
export { default as Button } from "./Basics/Button"; //button type 1
export { default as ButtonClean } from "./Basics/ButtonClean"; //button type 2
export { default as ButtonShadow } from "./Basics/ButtonShadow"; //button type 3
export { default as Banner } from "./Basics/Banner"; //banner for top of some pages
export { default as Loading } from "./Basics/Loading"; //loading animation
export { default as Footer } from "./Basics/Footer"; //footer
export { default as LoginGraphic } from "./Basics/LoginGraphic"; //shows when user is not connected to a profile
export { default as Logo } from "./Basics/Logo"; //logo
export { default as Socials } from "./Basics/Socials"; //social media buttons
export { default as FormTabs } from "./Basics/FormTabs"; //tabs for forms
export { default as Input } from "./Basics/Input"; //input form on large LSP visuals
export { default as FormContainer } from "./Basics/FormContainer"; //container for forms
export { default as FullScreenButton } from "./Basics/FullScreenButton"; //button to go full screen
export { default as Address } from "./EOAAccount/Address"; //address component with blockscout link and copy address 
export { default as LYXBalanceFuncs } from "./EOAAccount/LYXBalanceFuncs"; //UP native token balance and transfer component

//components for the get started page
export { default as StepLeft } from "./GetStarted/StepLeft"; //instrucions box for the "Get Started" page
export { default as StepDot } from "./GetStarted/StepDot"; //animation for the "Get Started" page

//forms components
export { default as ProfileThemesForm } from "./Forms/ProfileThemesForm"; //profile theme settings
export { default as ManagePermissionsForm } from "./Forms/ManagePermissionsForm"; //manage permissioned accounts
export { default as PermissionTypesCheckbox } from "./Forms/PermissionTypesCheckbox"; //shows the various types of permissions to be managed
export { default as CreateLSPForm } from "./Forms/CreateLSPForm"; //deploy contract form for LSPs 7 and 8
export { default as MintLSPForm } from "./Forms/MintLSPForm"; //mint form for LSPs 7 and 8
export { default as MyVaultsForm } from "./Forms/MyVaultsForm"; //vault metadata
export { default as VaultPermissionsForm } from "./Forms/VaultPermissionsForm"; //manages allowed addresses
export { default as RemoveVaultForm } from "./Forms/RemoveVaultForm"; //removes a vault from LSP10

//large LSP asset visuals
export { default as LSP7TokenCoin } from "./LSPAssetVisuals/LSP7TokenCoin"; //large coin visual for LSP7
export { default as LSP8NFTCard } from "./LSPAssetVisuals/LSP8NFTCard"; //large card visual for LSP8
export { default as OptionsPanel } from "./LSPAssetVisuals/OptionsPanel"; //options panel component for the large visuals

//components for the universal profile dropdown
export { default as UpdateProfile } from "./UniversalProfile/UpdateProfile"; //handles profile updates to the blockchain
export { default as UploadBannerImage } from "./UniversalProfile/UploadBannerImage"; //handles banner image upload
export { default as UploadProfileImage } from "./UniversalProfile/UploadProfileImage"; //handles profile image upload
export { default as DisconnectProfile } from "./UniversalProfile/DisconnectProfile"; //handles disconnecting the profile
export { default as ProfileTags } from "./UniversalProfile/ProfileTags"; //handles profile tags
export { default as ProfileLinks } from "./UniversalProfile/ProfileLinks"; //handles profile links
export { default as MyMenuItem } from "./UniversalProfile/MyMenuItem"; //component for icon links at the bottom of the dropdown

//key manager
export { default as GetPermissions } from "./KeyManager/GetPermissions"; //shows all permissions associated with a clicked address
export { default as GrantPermissions } from "./KeyManager/GrantPermissions"; //grants permissions to MLW public EOA account - currently unused; should remove in the future
