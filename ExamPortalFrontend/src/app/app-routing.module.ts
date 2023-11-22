import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { authGuard } from './pages/auth.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { adminGuard } from './pages/admin.guard';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { ReviewResultComponent } from './pages/user/review-result/review-result.component';

const routes: Routes = [
  {
    path: 'signUp',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate:[adminGuard],
    children:[
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'quizzes',
        component: ViewQuizComponent
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent
      },
      {
        path: 'quiz/:qId',
        component: UpdateQuizComponent
      },
      {
        path: 'view-questions/:qId/:title',
        component: ViewQuestionsComponent
      },
      {
        path: 'add-question/:qId/:title',
        component: AddQuestionComponent
      },
      {
        path: 'update-question/:quesId/:qId/:quesTitle',
        component: UpdateQuestionComponent
      },
      
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate:[authGuard],
    children:[
      {
        path:':catId',
        component: LoadQuizComponent
      },
      {
        path:'instructions/:qId',
        component: InstructionsComponent
      },
      
    ]
  },
  {
    path:'start/:qId',
    component: StartQuizComponent,
    canActivate:[authGuard],
  },
  {
    path: 'review',
    component: ReviewResultComponent,
    canActivate:[authGuard]
  },
  { 
    path: 'forgot', 
    component: ForgotPasswordComponent,pathMatch: 'full' 
  },
  { 
    path: 'verify-otp', component: VerifyOtpComponent,pathMatch: 'full' 
  },
  { 
    path: 'reset-password', component: ResetPasswordComponent ,pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }