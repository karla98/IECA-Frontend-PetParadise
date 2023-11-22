import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

 /* { path: 'about', component: AboutComponent, data: { title: 'Sobre mí' } },
  { path: 'skills', component: SkillsComponent, data: { title: 'Skills' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Proyectos' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contáctame' } },
*/

  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
