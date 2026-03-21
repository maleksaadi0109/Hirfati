Hirfati/
├── .editorconfig
├── .env.example
├── .gitattributes
├── .github/
│   └── workflows/
│       ├── lint.yml
│       └── tests.yml
├── .gitignore
├── .prettierignore
├── .prettierrc
├── app/
│   ├── Actions/
│   │   ├── Auth/
│   │   │   ├── LoginUserAction.php
│   │   │   ├── LogoutUserAction.php
│   │   │   ├── RegisterStoreAction.php
│   │   │   ├── ResendRegistrationCodeAction.php
│   │   │   ├── ResetPasswordAction.php
│   │   │   ├── SendEmailVerificationCodeAction.php
│   │   │   ├── SendResetCodeAction.php
│   │   │   ├── VerifyEmailCodeAction.php
│   │   │   ├── VerifyRegistrationCodeAction.php
│   │   │   └── VerifyResetCodeAction.php
│   │   ├── Fortify/
│   │   │   ├── CreateNewUser.php
│   │   │   ├── PasswordValidationRules.php
│   │   │   └── ResetUserPassword.php
│   │   └── Location/
│   │       ├── FindNearByProvidersAction.php
│   │       └── UpdateUserLocationAction.php
│   ├── Console/
│   │   └── Commands/
│   │       └── CreateAdminCommand.php
│   ├── Events/
│   │   └── MessageSent.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── Admin/
│   │   │   │   │   └── CraftsmanApprovalController.php
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── EmailVerificationController.php
│   │   │   │   │   ├── ForgotPasswordController.php
│   │   │   │   │   ├── LoginController.php
│   │   │   │   │   └── RegisterController.php
│   │   │   │   ├── Client/
│   │   │   │   │   ├── CustomerAddressController.php
│   │   │   │   │   ├── DashboardSummaryController.php
│   │   │   │   │   ├── OrderController.php
│   │   │   │   │   ├── ProviderDiscoveryController.php
│   │   │   │   │   ├── ServiceOrderController.php
│   │   │   │   │   └── UpdateUserInfoController.php
│   │   │   │   ├── Craftsman/
│   │   │   │   │   ├── JobRequestController.php
│   │   │   │   │   └── ProfileController.php
│   │   │   │   ├── Customer/
│   │   │   │   │   ├── BookingController.php
│   │   │   │   │   └── SearchController.php
│   │   │   │   ├── LocationController.php
│   │   │   │   ├── Messages/
│   │   │   │   │   └── MessageController.php
│   │   │   │   ├── Provider/
│   │   │   │   │   ├── DashboardSummaryController.php
│   │   │   │   │   ├── ProviderAddressController.php
│   │   │   │   │   ├── ProviderController.php
│   │   │   │   │   ├── ProviderPostController.php
│   │   │   │   │   └── ResubmitApplicationController.php
│   │   │   │   └── UserController.php
│   │   │   ├── Controller.php
│   │   │   └── Settings/
│   │   │       ├── PasswordController.php
│   │   │       ├── ProfileController.php
│   │   │       └── TwoFactorAuthenticationController.php
│   │   ├── Middleware/
│   │   │   ├── CheckRole.php
│   │   │   ├── HandleAppearance.php
│   │   │   ├── HandleInertiaRequests.php
│   │   │   └── Provider/
│   │   │       ├── CheckProviderStatus.php
│   │   │       ├── EnsureProviderPending.php
│   │   │       └── EnsureProviderRejected.php
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   │   ├── ForgotPasswordRequest.php
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── RegisterRequest.php
│   │   │   ├── Client/
│   │   │   │   ├── CancelCustomerOrderRequest.php
│   │   │   │   ├── StoreCustomerAddressRequest.php
│   │   │   │   ├── StoreCustomerOrderRequest.php
│   │   │   │   ├── UpdateClientInfoRequest.php
│   │   │   │   └── UpdateCustomerAddressRequest.php
│   │   │   ├── Location/
│   │   │   │   ├── FindNearByProvidersRequeset.php
│   │   │   │   └── UpdateUserLocationRequest.php
│   │   │   ├── Messages/
│   │   │   │   └── SendMessageRequest.php
│   │   │   ├── Provider/
│   │   │   │   ├── ProviderRequest.php
│   │   │   │   └── StoreProviderPostRequest.php
│   │   │   └── Settings/
│   │   │       ├── ProfileUpdateRequest.php
│   │   │       └── TwoFactorAuthenticationRequest.php
│   │   ├── Resources/
│   │   │   ├── Admin/
│   │   │   │   └── CraftsmanResource.php
│   │   │   ├── Auth/
│   │   │   │   ├── AdminResource.php
│   │   │   │   ├── CustomerResource.php
│   │   │   │   └── ProviderResource.php
│   │   │   ├── ConversationResource.php
│   │   │   ├── CustomerOrderResource.php
│   │   │   ├── MessageResource.php
│   │   │   ├── ProviderPostResource.php
│   │   │   └── UserResource.php
│   │   └── Responses/
│   │       └── CustomLoginResponse.php
│   ├── Mail/
│   │   ├── Auth/
│   │   │   ├── EmailVerificationCodeMail.php
│   │   │   ├── SendResetCodeMail.php
│   │   │   └── WelcomeUserMail.php
│   │   └── Provider/
│   │       ├── ApproveMail.php
│   │       └── RejectedMail.php
│   ├── Models/
│   │   ├── Customer.php
│   │   ├── CustomerAddress.php
│   │   ├── CustomerOrder.php
│   │   ├── Message.php
│   │   ├── Portfolio.php
│   │   ├── Provider.php
│   │   ├── ProviderAddress.php
│   │   ├── ProviderPost.php
│   │   ├── ProviderPostImage.php
│   │   └── User.php
│   ├── modules/
│   │   ├── Booking/
│   │   │   └── Models/
│   │   │       ├── Booking.php
│   │   │       ├── Category.php
│   │   │       └── Review.php
│   │   ├── Message/
│   │   │   └── Models/
│   │   │       └── Message.php
│   │   └── Payment/
│   │       └── Models/
│   │           └── Payment.php
│   ├── Policies/
│   │   ├── CustomerOrderPolicy.php
│   │   └── ProviderPostPolicy.php
│   ├── Providers/
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServerProvider.php
│   │   └── FortifyServiceProvider.php
│   └── Traits/
│       └── ApiResponses.php
├── artisan
├── bootstrap/
│   ├── app.php
│   ├── cache/
│   │   └── .gitignore
│   └── providers.php
├── components.json
├── composer.json
├── composer.lock
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── broadcasting.php
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── fortify.php
│   ├── inertia.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── reverb.php
│   ├── sanctum.php
│   ├── services.php
│   └── session.php
├── count()
├── count())
├── database/
│   ├── .gitignore
│   ├── factories/
│   │   └── UserFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2025_08_26_100418_add_two_factor_columns_to_users_table.php
│   │   ├── 2026_02_21_121454_create_personal_access_tokens_table.php
│   │   ├── 2026_02_21_131633_create_customers_table.php
│   │   ├── 2026_02_21_131634_create_providers_table.php
│   │   ├── 2026_02_21_165732_create_bookings_table.php
│   │   ├── 2026_02_21_165732_create_categories_table.php
│   │   ├── 2026_02_21_165733_create_portfolios_table.php
│   │   ├── 2026_02_21_165733_create_reviews_table.php
│   │   ├── 2026_02_21_165736_create_messages_table.php
│   │   ├── 2026_02_21_214944_create_payments_table.php
│   │   ├── 2026_02_23_000001_add_application_fields_to_providers_table.php
│   │   ├── 2026_02_27_133618_add_rate_limiting_to_password_reset_tokens_table.php
│   │   ├── 2026_02_28_110049_remove_rate_limiting_columns_from_password_reset_tokens_table.php
│   │   ├── 2026_02_28_141616_add_location_to_users_table.php
│   │   ├── 2026_02_28_142500_remove_default_address_from_customers_table.php
│   │   ├── 2026_03_03_151042_add_is_blocked_to_users_table.php
│   │   ├── 2026_03_13_133333_add_picture_and_birthday_to_users_table.php
│   │   ├── 2026_03_14_150000_create_customer_addresses_table.php
│   │   ├── 2026_03_14_160000_add_details_to_customer_addresses_table.php
│   │   ├── 2026_03_15_120000_create_customer_orders_table.php
│   │   ├── 2026_03_15_161209_create_messages_table.php
│   │   ├── 2026_03_16_000000_align_messages_table_for_order_chat.php
│   │   ├── 2026_03_16_150313_add_file_to__message_table.php
│   │   ├── 2026_03_16_220815_add_coulum_to_provider_file.php
│   │   ├── 2026_03_18_154856_create_provider_addresses_table.php
│   │   ├── 2026_03_18_164718_create_provider_posts_table.php
│   │   └── 2026_03_18_164721_create_provider_post_images_table.php
│   └── seeders/
│       ├── AdminSeeder.php
│       ├── CustomerOrderTestDataSeeder.php
│       ├── DatabaseSeeder.php
│       └── MessageTestDataSeeder.php
├── eslint.config.js
├── first())
├── package-lock.json
├── package.json
├── phpunit.xml
├── public/
│   ├── .htaccess
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── favicon.jpg
│   ├── favicon.svg
│   ├── ffff.png
│   ├── fsdff.svg
│   ├── fsdfsdfsd.ico
│   ├── images/
│   │   ├── hero-handyman.jpg
│   │   └── hirfati-logo.jpg
│   ├── index.php
│   ├── logo.svg
│   ├── robots.txt
│   └── screenshots/
│       ├── dashboard.png
│       ├── home_page.png
│       ├── landing_page.png
│       ├── messages.png
│       ├── my_orders_dashboard.png
│       ├── profile_edit_page.png
│       └── profile_page.png
├── README.md
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── app.tsx
│   │   ├── components/
│   │   │   ├── alert-error.tsx
│   │   │   ├── app-content.tsx
│   │   │   ├── app-header.tsx
│   │   │   ├── app-logo-icon.tsx
│   │   │   ├── app-logo.tsx
│   │   │   ├── app-shell.tsx
│   │   │   ├── app-sidebar-header.tsx
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── appearance-dropdown.tsx
│   │   │   ├── appearance-tabs.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── ClientSidebar.tsx
│   │   │   ├── delete-user.tsx
│   │   │   ├── heading-small.tsx
│   │   │   ├── heading.tsx
│   │   │   ├── icon.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── input-error.tsx
│   │   │   ├── nav-footer.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── text-link.tsx
│   │   │   ├── two-factor-recovery-codes.tsx
│   │   │   ├── two-factor-setup-modal.tsx
│   │   │   ├── ui/
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── icon.tsx
│   │   │   │   ├── input-otp.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── placeholder-pattern.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── spinner.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   ├── user-info.tsx
│   │   │   └── user-menu-content.tsx
│   │   ├── hooks/
│   │   │   ├── use-appearance.tsx
│   │   │   ├── use-clipboard.ts
│   │   │   ├── use-initials.tsx
│   │   │   ├── use-mobile-navigation.ts
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-two-factor-auth.ts
│   │   ├── layouts/
│   │   │   ├── app/
│   │   │   │   ├── app-header-layout.tsx
│   │   │   │   └── app-sidebar-layout.tsx
│   │   │   ├── app-layout.tsx
│   │   │   ├── auth/
│   │   │   │   ├── auth-card-layout.tsx
│   │   │   │   ├── auth-simple-layout.tsx
│   │   │   │   └── auth-split-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── settings/
│   │   │       └── layout.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── craftsman-detail.tsx
│   │   │   │   └── craftsmen.tsx
│   │   │   ├── auth/
│   │   │   │   ├── account-suspended.tsx
│   │   │   │   ├── confirm-password.tsx
│   │   │   │   ├── forgot-password.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   ├── new-reset-password.tsx
│   │   │   │   ├── Onboarding.tsx
│   │   │   │   ├── pending-approval.tsx
│   │   │   │   ├── register.backup.tsx
│   │   │   │   ├── register.tsx
│   │   │   │   ├── rejected-approval.tsx
│   │   │   │   ├── reset-password.tsx
│   │   │   │   ├── two-factor-challenge.tsx
│   │   │   │   ├── verify-email.tsx
│   │   │   │   └── verify-reset-code.tsx
│   │   │   ├── Billing.tsx
│   │   │   ├── client/
│   │   │   │   ├── AddressCreate.tsx
│   │   │   │   ├── AddressEdit.tsx
│   │   │   │   ├── BookService.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── ExplorePosts.tsx
│   │   │   │   ├── FindPros.tsx
│   │   │   │   ├── Messages.tsx
│   │   │   │   ├── MyOrders.tsx
│   │   │   │   ├── OrderDetails.tsx
│   │   │   │   ├── OrderSuccess.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   └── ProviderPosts.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── ClientDashboard.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── ChatInterface.tsx
│   │   │   │   │   └── DashboardComponents.tsx
│   │   │   │   └── WorkerDashboard.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Error.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── FindWork.tsx
│   │   │   ├── Jobs/
│   │   │   │   └── Create.tsx
│   │   │   ├── marketplace/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ChatInterface.tsx
│   │   │   │   │   ├── FloatingShapes.tsx
│   │   │   │   │   ├── FloatingToolsScene.tsx
│   │   │   │   │   ├── LandingPage.tsx
│   │   │   │   │   ├── ListingPage.tsx
│   │   │   │   │   ├── ProviderProfile.tsx
│   │   │   │   │   └── ui/
│   │   │   │   │       ├── accordion.tsx
│   │   │   │   │       ├── alert-dialog.tsx
│   │   │   │   │       ├── alert.tsx
│   │   │   │   │       ├── aspect-ratio.tsx
│   │   │   │   │       ├── avatar.tsx
│   │   │   │   │       ├── badge.tsx
│   │   │   │   │       ├── breadcrumb.tsx
│   │   │   │   │       ├── button.tsx
│   │   │   │   │       ├── calendar.tsx
│   │   │   │   │       ├── card.tsx
│   │   │   │   │       ├── carousel.tsx
│   │   │   │   │       ├── chart.tsx
│   │   │   │   │       ├── checkbox.tsx
│   │   │   │   │       ├── collapsible.tsx
│   │   │   │   │       ├── command.tsx
│   │   │   │   │       ├── context-menu.tsx
│   │   │   │   │       ├── dialog.tsx
│   │   │   │   │       ├── drawer.tsx
│   │   │   │   │       ├── dropdown-menu.tsx
│   │   │   │   │       ├── form.tsx
│   │   │   │   │       ├── hover-card.tsx
│   │   │   │   │       ├── input-otp.tsx
│   │   │   │   │       ├── input.tsx
│   │   │   │   │       ├── label.tsx
│   │   │   │   │       ├── menubar.tsx
│   │   │   │   │       ├── navigation-menu.tsx
│   │   │   │   │       ├── pagination.tsx
│   │   │   │   │       ├── popover.tsx
│   │   │   │   │       ├── progress.tsx
│   │   │   │   │       ├── radio-group.tsx
│   │   │   │   │       ├── resizable.tsx
│   │   │   │   │       ├── scroll-area.tsx
│   │   │   │   │       ├── select.tsx
│   │   │   │   │       ├── separator.tsx
│   │   │   │   │       ├── sheet.tsx
│   │   │   │   │       ├── sidebar.tsx
│   │   │   │   │       ├── skeleton.tsx
│   │   │   │   │       ├── slider.tsx
│   │   │   │   │       ├── sonner.tsx
│   │   │   │   │       ├── switch.tsx
│   │   │   │   │       ├── table.tsx
│   │   │   │   │       ├── tabs.tsx
│   │   │   │   │       ├── textarea.tsx
│   │   │   │   │       ├── toggle-group.tsx
│   │   │   │   │       ├── toggle.tsx
│   │   │   │   │       ├── tooltip.tsx
│   │   │   │   │       ├── use-mobile.ts
│   │   │   │   │       └── utils.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── marketplace.css
│   │   │   ├── MyJobs.tsx
│   │   │   ├── Orders/
│   │   │   │   ├── Create.tsx
│   │   │   │   └── MyOrders.tsx
│   │   │   ├── Profile/
│   │   │   │   ├── Edit.tsx
│   │   │   │   └── Show.tsx
│   │   │   ├── Pros/
│   │   │   │   └── Index.tsx
│   │   │   ├── Reviews.tsx
│   │   │   ├── settings/
│   │   │   │   ├── appearance.tsx
│   │   │   │   ├── Index.tsx
│   │   │   │   ├── password.tsx
│   │   │   │   ├── profile.tsx
│   │   │   │   └── two-factor.tsx
│   │   │   ├── Wallet.tsx
│   │   │   ├── welcome.tsx
│   │   │   └── worker/
│   │   │       ├── AddressCreate.tsx
│   │   │       ├── AddressEdit.tsx
│   │   │       ├── CompleteProfile.tsx
│   │   │       ├── Dashboard.tsx
│   │   │       ├── Messages.tsx
│   │   │       ├── MyPosts.tsx
│   │   │       └── Profile.tsx
│   │   ├── ssr.tsx
│   │   └── types/
│   │       ├── index.d.ts
│   │       └── vite-env.d.ts
│   └── views/
│       ├── app.blade.php
│       └── emails/
│           ├── provider/
│           │   ├── approved.blade.php
│           │   └── rejected.blade.php
│           └── users/
│               ├── ResetCode.blade.php
│               ├── verify-email-code.blade.php
│               └── welcome.blade.php
├── rewrite_register.cjs
├── routes/
│   ├── Admin/
│   │   └── api_admin.php
│   ├── Auth/
│   │   └── api_auth.php
│   ├── channels.php
│   ├── console.php
│   ├── Customer/
│   │   ├── api_customer.php
│   │   └── Customer_web.php
│   ├── Provider/
│   │   ├── api_provider.php
│   │   └── provider_web.php
│   ├── settings.php
│   └── web.php
├── storage/
│   ├── app/
│   │   ├── .gitignore
│   │   ├── private/
│   │   │   └── .gitignore
│   │   └── public/
│   │       └── .gitignore
│   ├── debugbar/
│   │   └── .gitignore
│   ├── framework/
│   │   ├── .gitignore
│   │   ├── cache/
│   │   │   ├── .gitignore
│   │   │   └── data/
│   │   │       └── .gitignore
│   │   ├── sessions/
│   │   │   └── .gitignore
│   │   ├── testing/
│   │   │   └── .gitignore
│   │   └── views/
│   │       └── .gitignore
│   └── logs/
│       └── .gitignore
├── strip_dark.cjs
├── tests/
│   ├── Feature/
│   │   ├── Auth/
│   │   │   ├── AuthenticationTest.php
│   │   │   ├── EmailVerificationTest.php
│   │   │   ├── PasswordConfirmationTest.php
│   │   │   ├── PasswordResetTest.php
│   │   │   ├── RegistrationTest.php
│   │   │   ├── TwoFactorChallengeTest.php
│   │   │   └── VerificationNotificationTest.php
│   │   ├── DashboardTest.php
│   │   ├── ExampleTest.php
│   │   └── Settings/
│   │       ├── PasswordUpdateTest.php
│   │       ├── ProfileUpdateTest.php
│   │       └── TwoFactorAuthenticationTest.php
│   ├── Pest.php
│   ├── TestCase.php
│   └── Unit/
│       └── ExampleTest.php
├── tsconfig.json
├── update_register.cjs
├── value('password'))
└── vite.config.ts
s